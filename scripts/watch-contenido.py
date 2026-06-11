#!/usr/bin/env python3
"""
watch-contenido.py — Watcher automático del blog Grupo LGO

Vigila la carpeta de Cowork (C:\\Users\\edgar\\Contenido Grupo LGO).
Cuando aparece un linkedin_post.txt nuevo dentro de una carpeta YYYY-MM-DD,
espera unos segundos para que Cowork termine de escribir todos los archivos,
y luego invoca nuevo-articulo.py --carpeta NOMBRE.

El script publicador (nuevo-articulo.py) ya tiene su propio log de carpetas
procesadas, así que si se dispara dos veces para la misma carpeta, la
segunda corrida se omite automáticamente. Idempotencia garantizada.

Modos:
    python watch-contenido.py             # vigila indefinidamente
    python watch-contenido.py --once      # procesa pendientes de hoy y sale
    python watch-contenido.py --verbose   # más detalle en log

Requiere: pip install watchdog
"""

import sys
import time
import threading
import argparse
import subprocess
import datetime
from pathlib import Path

# Forzar UTF-8 en stdout/stderr para Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("ERROR: falta la dependencia 'watchdog'. Instala con:")
    print("    pip install watchdog")
    sys.exit(1)

# ── Configuración ────────────────────────────────────────────────────────────

CONTENIDO_DIR = Path(r"C:\Users\edgar\Contenido Grupo LGO")
PROYECTO_DIR  = Path(r"C:\Users\edgar\LGO web")
SCRIPT        = PROYECTO_DIR / "scripts" / "nuevo-articulo.py"
LOG_FILE      = PROYECTO_DIR / "logs" / "watcher.log"

# Cuántos segundos esperar después del último cambio antes de procesar.
# Cowork puede tardar varios segundos en copiar todos los archivos de una
# carpeta. Si el debounce es muy bajo, podríamos procesar la carpeta antes
# de que estén todos los assets.
DEBOUNCE_SECONDS = 8

# Archivo cuya aparición dispara el procesado.
TARGET_FILENAME = "linkedin_post.txt"

VERBOSE = False

# ── Logging ──────────────────────────────────────────────────────────────────

def log(msg: str, verbose_only: bool = False) -> None:
    if verbose_only and not VERBOSE:
        return
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


# ── Handler ──────────────────────────────────────────────────────────────────

class CarpetaHandler(FileSystemEventHandler):
    """Detecta apariciones/modificaciones de linkedin_post.txt y dispara
    el procesado con debounce. Si el archivo se escribe en varios chunks
    (cosa frecuente), reseteamos el timer para que solo dispare cuando el
    archivo se 'asienta'."""

    def __init__(self) -> None:
        super().__init__()
        self.pending: dict[str, threading.Timer] = {}
        self.lock = threading.Lock()

    def _process(self, carpeta_name: str) -> None:
        """Ejecutado por el Timer cuando el debounce vence."""
        with self.lock:
            self.pending.pop(carpeta_name, None)

        log(f"PROCESANDO: {carpeta_name}")
        try:
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "--carpeta", carpeta_name],
                cwd=str(PROYECTO_DIR),
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=180,
            )
            if result.returncode == 0:
                log(f"OK: {carpeta_name}")
                if VERBOSE and result.stdout.strip():
                    log(result.stdout.strip(), verbose_only=True)
            else:
                log(
                    f"FALLO (rc={result.returncode}) en {carpeta_name}: "
                    f"{result.stderr.strip() or result.stdout.strip()}"
                )
        except subprocess.TimeoutExpired:
            log(f"TIMEOUT (180s): {carpeta_name} — el script no terminó")
        except Exception as e:
            log(f"EXCEPCION llamando al script para {carpeta_name}: {e}")

    def _schedule(self, carpeta_name: str) -> None:
        """Programa o reprograma el procesado con debounce."""
        with self.lock:
            existing = self.pending.get(carpeta_name)
            if existing:
                existing.cancel()
            t = threading.Timer(
                DEBOUNCE_SECONDS,
                self._process,
                args=(carpeta_name,),
            )
            t.daemon = True
            self.pending[carpeta_name] = t
            t.start()
        log(
            f"VISTO {carpeta_name}/{TARGET_FILENAME} → procesado en {DEBOUNCE_SECONDS}s",
            verbose_only=True,
        )

    def _carpeta_de_target(self, ruta: str) -> str | None:
        """Si la ruta apunta a CONTENIDO_DIR/CARPETA/linkedin_post.txt,
        devuelve el nombre de CARPETA. Si no, devuelve None."""
        p = Path(ruta)
        if p.name != TARGET_FILENAME:
            return None
        try:
            rel = p.relative_to(CONTENIDO_DIR)
        except ValueError:
            return None
        # rel debe ser exactamente "CARPETA/linkedin_post.txt" — un solo nivel
        if len(rel.parts) != 2:
            return None
        return rel.parts[0]

    def on_created(self, event):
        if event.is_directory:
            return
        carpeta = self._carpeta_de_target(event.src_path)
        if carpeta:
            self._schedule(carpeta)

    def on_modified(self, event):
        if event.is_directory:
            return
        carpeta = self._carpeta_de_target(event.src_path)
        if carpeta:
            self._schedule(carpeta)

    def on_moved(self, event):
        if event.is_directory:
            return
        # Cuando Cowork termina, a veces hace move-into-place
        dest = getattr(event, "dest_path", None)
        if dest:
            carpeta = self._carpeta_de_target(dest)
            if carpeta:
                self._schedule(carpeta)


# ── Modos ────────────────────────────────────────────────────────────────────

def run_once() -> int:
    """Llama al script en modo automático: procesa carpetas de hoy pendientes."""
    log("Modo --once: pidiendo a nuevo-articulo.py que procese pendientes de hoy")
    result = subprocess.run(
        [sys.executable, str(SCRIPT)],
        cwd=str(PROYECTO_DIR),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if result.stdout.strip():
        for line in result.stdout.strip().splitlines():
            log(line)
    if result.returncode != 0 and result.stderr.strip():
        log(f"STDERR: {result.stderr.strip()}")
    return result.returncode


def run_watch() -> None:
    if not CONTENIDO_DIR.exists():
        log(f"ERROR: no existe {CONTENIDO_DIR}")
        sys.exit(1)
    if not SCRIPT.exists():
        log(f"ERROR: no existe {SCRIPT}")
        sys.exit(1)

    handler = CarpetaHandler()
    observer = Observer()
    observer.schedule(handler, str(CONTENIDO_DIR), recursive=True)
    observer.start()

    log("─" * 60)
    log(f"VIGILANDO: {CONTENIDO_DIR}")
    log(f"  archivo objetivo: */{TARGET_FILENAME}")
    log(f"  debounce: {DEBOUNCE_SECONDS}s")
    log(f"  proyecto: {PROYECTO_DIR}")
    log("Presiona Ctrl+C para detener.")
    log("─" * 60)

    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        log("Recibido Ctrl+C — deteniendo watcher...")
        observer.stop()
    observer.join()
    log("Watcher detenido.")


def main() -> None:
    global VERBOSE
    ap = argparse.ArgumentParser(description="Watcher del blog Grupo LGO")
    ap.add_argument("--once", action="store_true",
                    help="Procesa pendientes de hoy y sale (no vigila)")
    ap.add_argument("--verbose", action="store_true",
                    help="Imprime mensajes adicionales en el log")
    args = ap.parse_args()
    VERBOSE = args.verbose

    if args.once:
        sys.exit(run_once())
    else:
        run_watch()


if __name__ == "__main__":
    main()

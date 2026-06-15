#!/usr/bin/env python3
"""
limpiar-firmas.py — Migración de una sola vez.

Quita de los artículos ya publicados en src/content/perspectivas/ el bloque de
cierre estilo LinkedIn (firma del autor + hashtags) que el script viejo dejaba
pegado en el cuerpo, duplicando la firma que la plantilla ya pinta desde el
frontmatter `author`. Además, si la pregunta de cierre quedó atrapada en el
cuerpo y el frontmatter no tiene `highlight`, la mueve a `highlight`.

Es seguro y conservador: solo toca párrafos del FINAL que sean firma o hashtags,
y solo mueve la pregunta a highlight en archivos donde detectó y quitó ese
bloque de cierre (formato Cowork).

Uso:
  python scripts/limpiar-firmas.py            → DRY RUN (no escribe, solo reporta)
  python scripts/limpiar-firmas.py --apply    → aplica los cambios
"""
import re
import sys
import argparse
from pathlib import Path

CONTENT_DIR  = Path(r"C:\Users\edgar\LGO web\src\content\perspectivas")
AUTOR_NOMBRE = "Edgar Mizhraim Lugo García"
AUTOR_EMAIL  = "contacto@lgo.mx"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

_HASHTAGS_RE = re.compile(r"^\s*#\w+(?:\s+#\w+)*\s*$")
_FM_RE       = re.compile(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)$", re.S)


def es_hashtags(parrafo: str) -> bool:
    return bool(_HASHTAGS_RE.match(parrafo.strip()))


def es_firma(parrafo: str) -> bool:
    p = parrafo.lower()
    return AUTOR_EMAIL.lower() in p or AUTOR_NOMBRE.lower() in p


def yaml_string(s: str) -> str:
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


def procesar(md_path: Path, apply: bool) -> bool:
    texto = md_path.read_text(encoding="utf-8")
    m = _FM_RE.match(texto)
    if not m:
        print(f"SKIP (sin frontmatter reconocible): {md_path.name}")
        return False

    fm, body = m.group(1), m.group(2)
    tiene_highlight = re.search(r"(?m)^highlight:", fm) is not None

    parrafos = [p.strip() for p in re.split(r"\n{2,}", body.strip()) if p.strip()]

    # Quitar del final los párrafos de firma / hashtags.
    quitados = []
    while parrafos and (es_hashtags(parrafos[-1]) or es_firma(parrafos[-1])):
        quitados.append(parrafos.pop())
    quitados.reverse()

    # Mover la pregunta de cierre a highlight SOLO si:
    #   - quitamos un bloque de cierre (es archivo formato Cowork),
    #   - el frontmatter no tiene ya un highlight,
    #   - y el nuevo último párrafo termina en signo de interrogación.
    nuevo_highlight = None
    if quitados and not tiene_highlight and parrafos and parrafos[-1].rstrip().endswith("?"):
        nuevo_highlight = parrafos.pop()

    if not quitados and not nuevo_highlight:
        return False  # nada que cambiar

    nuevo_fm = fm.rstrip("\n")
    if nuevo_highlight:
        nuevo_fm += f"\nhighlight: {yaml_string(nuevo_highlight)}"
    nuevo_texto = f"---\n{nuevo_fm}\n---\n\n" + "\n\n".join(parrafos) + "\n"

    print(f"\n=== {md_path.name} ===")
    for q in quitados:
        unica_linea = " ".join(q.split())
        print(f"  - quita: {unica_linea[:75]}")
    if nuevo_highlight:
        print(f"  -> highlight: {nuevo_highlight[:75]}")
    if apply:
        md_path.write_text(nuevo_texto, encoding="utf-8")
        print("  [ESCRITO]")

    return True


def main() -> None:
    ap = argparse.ArgumentParser(description="Limpia firma/hashtags duplicados en perspectivas")
    ap.add_argument("--apply", action="store_true", help="Escribe los cambios (sin esto, dry-run)")
    args = ap.parse_args()

    cambiados = 0
    for md in sorted(CONTENT_DIR.glob("*.md")):
        if procesar(md, args.apply):
            cambiados += 1

    modo = "APLICADO" if args.apply else "DRY RUN (usa --apply para escribir)"
    print(f"\n{modo}: {cambiados} archivo(s) con cambios de {len(list(CONTENT_DIR.glob('*.md')))} totales.")


if __name__ == "__main__":
    main()

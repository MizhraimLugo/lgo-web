#!/usr/bin/env python3
"""
nuevo-articulo.py — Automatización del blog Grupo LGO (sitio Astro)

Convierte carpetas de contenido (linkedin_post.txt) en archivos Markdown
con frontmatter para src/content/perspectivas/. Astro recompila y deploya
automáticamente via Netlify cuando se hace git push.

Modos de uso:
  python nuevo-articulo.py
      → automático: procesa carpetas de hoy que no han sido procesadas

  python nuevo-articulo.py --carpeta "2026-05-15"
      → procesa una carpeta específica, incluso si ya fue procesada

  python nuevo-articulo.py --todos
      → reprocesa todas las carpetas no procesadas

Flags útiles para pruebas y debug:
  --dry-run    → imprime el .md generado pero NO escribe a disco ni hace git
  --no-push    → escribe el .md pero NO hace git commit + push (sí escribe)
"""

import os
import re
import sys
import glob
import json
import unicodedata
import argparse
import datetime
import subprocess
from pathlib import Path

# Forzar UTF-8 en stdout/stderr para que Windows cmd.exe no rompa con
# caracteres como — “ ” acentos y box drawing. Python 3.7+ soporta esto.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ── Configuración ────────────────────────────────────────────────────────────

CONTENIDO_DIR  = Path(r"C:\Users\edgar\Contenido Grupo LGO")
PROYECTO_DIR   = Path(r"C:\Users\edgar\LGO web")
CONTENT_DIR    = PROYECTO_DIR / "src" / "content" / "perspectivas"
LOG_FILE       = PROYECTO_DIR / "logs" / "blog-auto.log"

AUTOR_NOMBRE   = "Edgar Mizhraim Lugo García"
AUTOR_EMAIL    = "contacto@lgo.mx"

# ── Asignación de brand y categoría ──────────────────────────────────────────
#
# El brand de un artículo se determina por (en orden de prioridad):
#
#   1. OVERRIDE EXPLÍCITO en el .txt — líneas tipo "BRAND: contadores"
#      al inicio del archivo (antes del título).
#   2. DÍA DE LA SEMANA de la fecha de la carpeta — siguiendo el calendario
#      de Cowork (lunes=grupo, martes=abogados, etc.).
#   3. DETECCIÓN POR KEYWORDS — fallback si la fecha no encaja en el calendario
#      o si los overrides están ausentes.
#
# El brand debe coincidir con LgoPracticeId del proyecto Astro
# (ver src/data/brands.ts). Brands no publicadas (tecnologia, marketing)
# se filtran automáticamente fuera del sitio hasta que su published: true.

# ── Calendario semanal de Cowork ─────────────────────────────────────────────
# Fuente de verdad para el día → brand. Coincide con las instrucciones del
# generador de contenido. Domingo no se procesa (carpetas no deberían existir).
#
# weekday() de Python: 0=lunes, 1=martes, ..., 6=domingo

DIA_A_BRAND = {
    0: {"brand": "grupo",      "category": "Emprendimiento"},          # Lunes
    1: {"brand": "abogados",   "category": "Derecho",                  # Martes
        # En martes la brand es fija (abogados) pero la categoría se
        # auto-detecta entre estas opciones según las keywords del texto.
        # Si nada matchea, se usa la "category" default (Derecho — genérica,
        # cuando no se puede determinar la subespecialidad).
        "category_auto": ["Laboral", "Corporativo", "Mercantil", "Administrativo"]},
    2: {"brand": "grupo",      "category": "Tecnología"},               # Miércoles
    3: {"brand": "contadores", "category": "Fiscal"},                  # Jueves
    4: {"brand": "grupo",      "category": "Liderazgo"},               # Viernes
    5: {"brand": "grupo",      "category": "Internacional"},           # Sábado
    # 6 (domingo): no aplica
}

# ── Fallback: detección por keywords ─────────────────────────────────────────
# Solo se usa si la fecha NO encaja en el calendario (raro) y no hay override.

CATEGORIAS = [
    {
        "category": "Fiscal",
        "brand":    "contadores",
        "keywords": ["sat", "declaración", "declaracion", "impuesto", "fiscal",
                     "contabilidad", "resico", "régimen", "regimen", "retención",
                     "retencion", "código fiscal", "codigo fiscal", "contribuyente",
                     "isr", "iva", "cfdi", "factura", "deducción", "deduccion"],
    },
    # ── Familia DERECHO (brand: abogados) ───────────────────────────────────
    # El martes el script auto-detecta entre estas categorías según el texto.
    # Orden importa: la primera con match gana. Las más específicas van antes
    # de las más amplias para evitar que una palabra genérica robe el match.
    {
        "category": "Laboral",
        "brand":    "abogados",
        "keywords": ["contrato de trabajo", "jornada", "nómina", "nomina",
                     "trabajador", "patrón", "patron", "stps",
                     "ley federal del trabajo", "lft", "despido", "sindicato",
                     "horas extra", "finiquito", "liquidación", "liquidacion",
                     "desconexión digital", "desconexion digital",
                     "infonavit", "imss", "afore", "salario",
                     "reparto de utilidades", "ptu", "outsourcing", "rep",
                     "reglamento interior de trabajo"],
    },
    {
        "category": "Corporativo",
        "brand":    "abogados",
        "keywords": ["accionistas", "asamblea", "estatutos", "gobernanza",
                     "gobierno corporativo", "consejo de administración",
                     "consejo de administracion", "comisario", "capital social",
                     "dividendo", "dividendos", "fusión", "fusion",
                     "escisión", "escision", "transformación societaria",
                     "transformacion societaria", "s.a. de c.v.", "s.a.p.i.",
                     "s. de r.l.", "s.a.s.", "sociedad anónima", "sociedad anonima",
                     "acta constitutiva", "escritura pública", "escritura publica",
                     "poder general", "representante legal", "rfc moral"],
    },
    {
        "category": "Mercantil",
        "brand":    "abogados",
        "keywords": ["código de comercio", "codigo de comercio", "comerciante",
                     "pagaré", "pagare", "letra de cambio", "cheque",
                     "título de crédito", "titulo de credito",
                     "concurso mercantil", "quiebra", "insolvencia",
                     "factoraje", "arrendamiento financiero",
                     "garantía mobiliaria", "garantia mobiliaria",
                     "compraventa mercantil", "contrato de distribución",
                     "contrato de distribucion", "contrato de suministro",
                     "comisión mercantil", "comision mercantil",
                     "transporte de mercancías", "transporte de mercancias",
                     "franquicia"],
    },
    {
        "category": "Administrativo",
        "brand":    "abogados",
        "keywords": ["cofepris", "cofece", "profeco", "prodecon", "ift",
                     "cnbv", "cre ", "asea", "semarnat", "indaabin",
                     "procedimiento administrativo", "recurso de revisión",
                     "recurso de revision", "recurso administrativo",
                     "acto administrativo", "multa administrativa",
                     "sanción administrativa", "sancion administrativa",
                     "juicio contencioso administrativo", "tfja", "tfjfa",
                     "norma oficial mexicana", "nom-", "permiso administrativo",
                     "licencia administrativa", "autorización administrativa",
                     "autorizacion administrativa", "verificación administrativa",
                     "verificacion administrativa"],
    },
    {
        "category": "Propiedad Intelectual",
        "brand":    "abogados",
        "keywords": ["impi", "propiedad intelectual", "uspto",
                     "registro de marca", "diseño industrial",
                     "patente", "derechos de autor", "copyright",
                     "marca registrada", "signo distintivo"],
    },
    {
        "category": "Contratos",
        "brand":    "abogados",
        "keywords": ["arrendamiento", "cláusula", "clausula", "convenio",
                     "obligación contractual", "obligacion contractual",
                     "contrato de prestación", "contrato de prestacion",
                     "contrato de servicios", "rescisión", "rescision",
                     "incumplimiento contractual"],
    },
    {
        "category": "Tecnología Empresarial",
        "brand":    "grupo",
        "keywords": ["inteligencia artificial", "ia ", "automatización",
                     "automatizacion", "transformación digital",
                     "transformacion digital", "software", "tecnología empresarial"],
    },
    {
        "category": "Emprendimiento",
        "brand":    "grupo",
        "keywords": ["emprendedor", "emprender", "startup", "pyme",
                     "nearshoring", "ecosistema empresarial"],
    },
]

FALLBACK_CATEGORIA = {
    "category": "Empresarial",
    "brand":    "grupo",
}

# Cargo del autor según brand (aparece en frontmatter author.role)
ROLE_POR_BRAND = {
    "contadores": "Socio · LGO Contadores & Consultores",
    "abogados":   "Socio · LGO Abogados & Consultores, S.C.",
    "tecnologia": "Socio · LGO Tecnología",
    "marketing":  "Socio · LGO Marketing",
    "grupo":      "Socio · Grupo LGO",
}

# ── Logging ───────────────────────────────────────────────────────────────────

def log(mensaje: str) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts  = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    linea = f"[{ts}] {mensaje}"
    print(linea)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(linea + "\n")

# ── Helpers ───────────────────────────────────────────────────────────────────

def leer_procesados() -> set:
    """Devuelve el conjunto de carpetas ya procesadas según el log."""
    procesados = set()
    if not LOG_FILE.exists():
        return procesados
    with open(LOG_FILE, encoding="utf-8") as f:
        for linea in f:
            m = re.search(r"PROCESADO:\s+([^\s→]+)", linea)
            if m:
                procesados.add(m.group(1).strip())
    return procesados


def slugify(texto: str) -> str:
    """Convierte texto en slug ASCII sin acentos."""
    texto = unicodedata.normalize("NFKD", texto)
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    texto = texto.lower()
    texto = re.sub(r"[^a-z0-9\s-]", "", texto)
    texto = re.sub(r"[\s]+", "-", texto.strip())
    texto = re.sub(r"-+", "-", texto)
    return texto


def generar_slug_desde_titulo(titulo: str) -> str:
    """Toma las primeras 6 palabras significativas y genera el slug del año."""
    STOPWORDS = {"de", "del", "la", "el", "en", "y", "a", "los", "las", "un",
                 "una", "por", "con", "es", "que", "se", "su", "al", "no",
                 "si", "lo", "le", "ya", "pero", "para", "como", "esto",
                 "este", "esta", "más", "mas", "sin", "hay", "así", "asi"}
    palabras = titulo.split()
    significativas = [p for p in palabras if slugify(p) not in STOPWORDS and len(p) > 2]
    slug_base = slugify(" ".join(significativas[:6]))
    año = datetime.date.today().year
    return f"{slug_base}-{año}"


def nombre_archivo_disponible(slug_base: str) -> str:
    """Si el slug ya existe en src/content/perspectivas/, agrega -v2, -v3, etc."""
    nombre = f"{slug_base}.md"
    if not (CONTENT_DIR / nombre).exists():
        return nombre
    for i in range(2, 20):
        nombre = f"{slug_base}-v{i}.md"
        if not (CONTENT_DIR / nombre).exists():
            return nombre
    return nombre


def detectar_categoria_por_keywords(texto: str, candidatas: list[str] | None = None) -> dict:
    """Detecta categoría escaneando palabras clave en el texto.

    Si `candidatas` está dado, solo considera categorías cuya 'category'
    esté en esa lista (útil para acotar la detección a un subconjunto
    compatible con la brand del día — ej. martes solo derecho).

    Si no hay match, devuelve FALLBACK_CATEGORIA."""
    texto_lower = texto.lower()
    for cat in CATEGORIAS:
        if candidatas is not None and cat["category"] not in candidatas:
            continue
        for kw in cat["keywords"]:
            if kw in texto_lower:
                return cat
    return FALLBACK_CATEGORIA


def resolver_brand_y_categoria(
    overrides: dict,
    fecha: datetime.date,
    texto: str
) -> dict:
    """Determina brand y categoría según la jerarquía de prioridad:

    1. Override explícito desde el .txt (BRAND: x / CATEGORY: y)
    2. Día de la semana de la carpeta (calendario Cowork)
       — Algunos días (martes) tienen `category_auto`: lista de categorías
         candidatas que se intentan detectar por keywords. Si nada matchea,
         se usa la `category` default del día.
    3. Detección por keywords sin filtro (fallback: domingo o sin fecha)

    Devuelve {"brand": ..., "category": ...}.
    """
    weekday = fecha.weekday()
    base = DIA_A_BRAND.get(weekday)

    # ── 1. Override desde .txt ────────────────────────────────────────
    if overrides.get("brand") or overrides.get("category"):
        # Completa con el mapeo del día (o keywords) si el override es parcial.
        fallback = base or detectar_categoria_por_keywords(texto)
        return {
            "brand":    overrides.get("brand")    or fallback["brand"],
            "category": overrides.get("category") or fallback["category"],
        }

    # ── 2. Día de la semana ──────────────────────────────────────────
    if base:
        # Si el día tiene category_auto, intenta detectar entre las candidatas
        candidatas = base.get("category_auto")
        if candidatas:
            detectada = detectar_categoria_por_keywords(texto, candidatas=candidatas)
            # Si la detección encontró algo dentro de las candidatas, la usamos.
            # Si cayó a FALLBACK_CATEGORIA (no match), nos quedamos con el default del día.
            if detectada["category"] in candidatas:
                return {"brand": base["brand"], "category": detectada["category"]}
        return {"brand": base["brand"], "category": base["category"]}

    # ── 3. Fallback por keywords (domingo o sin fecha) ────────────────
    return detectar_categoria_por_keywords(texto)


def parsear_contenido(texto: str) -> dict:
    """
    Extrae título, cuerpo, pregunta final y overrides del linkedin_post.txt.

    Formatos soportados:
      - Líneas tipo "BRAND: x", "CATEGORY: y" al inicio = overrides
      - Primera línea no vacía después de overrides = título
        (o línea que empieza con "Título:")
      - Último párrafo con "?" como bloque destacado (highlight)
      - Todo lo intermedio como párrafos del cuerpo

    Overrides reconocidos (case-insensitive, todos opcionales):
      BRAND: abogados | contadores | tecnologia | marketing | grupo
      CATEGORY: cualquier texto libre
      HIGHLIGHT: pregunta de cierre (alternativa a último párrafo con ?)
    """
    overrides = {}
    lineas = texto.strip().splitlines()

    # Saltar líneas vacías iniciales
    while lineas and not lineas[0].strip():
        lineas.pop(0)

    # Detectar overrides al inicio (hasta encontrar línea sin formato KEY: value)
    OVERRIDE_RE = re.compile(r"^([A-Z]+):\s*(.+)\s*$")
    while lineas:
        m = OVERRIDE_RE.match(lineas[0].strip())
        if not m:
            break
        key = m.group(1).lower()
        val = m.group(2).strip()
        if key in ("brand", "category", "highlight"):
            overrides[key] = val
            lineas.pop(0)
            # Saltar también la línea vacía de separación si la hay
            while lineas and not lineas[0].strip():
                lineas.pop(0)
        else:
            # Si no es un override conocido, dejarlo como contenido
            break

    if not lineas:
        return {"titulo": "", "parrafos": [], "pregunta": "", "overrides": overrides}

    # Extraer título
    titulo = lineas[0].strip()
    if titulo.lower().startswith("título:") or titulo.lower().startswith("titulo:"):
        titulo = re.sub(r"^[Tt]ítulo:\s*|^[Tt]itulo:\s*", "", titulo).strip()

    resto = "\n".join(lineas[1:]).strip()
    parrafos_raw = [p.strip() for p in re.split(r"\n{2,}", resto) if p.strip()]

    # Pregunta de cierre: override > último párrafo con ?
    pregunta = overrides.get("highlight", "")
    parrafos = parrafos_raw[:]
    if not pregunta and parrafos and "?" in parrafos[-1]:
        pregunta = parrafos.pop()
        pregunta = re.sub(r"^[Pp]regunta\s+final:\s*", "", pregunta).strip()

    return {
        "titulo": titulo,
        "parrafos": parrafos,
        "pregunta": pregunta,
        "overrides": overrides
    }


def fecha_desde_carpeta(nombre_carpeta: str) -> datetime.date:
    """Extrae fecha YYYY-MM-DD del nombre de carpeta. Soporta variantes V2, V3."""
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", nombre_carpeta)
    if m:
        return datetime.date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return datetime.date.today()


def generar_excerpt(parrafos: list) -> str:
    """Genera un excerpt del primer párrafo, truncado a ~200 chars en límite de palabra."""
    if not parrafos:
        return ""
    primero = parrafos[0]
    if len(primero) <= 200:
        return primero
    cortado = primero[:200].rsplit(" ", 1)[0]
    return cortado.rstrip(".,;:!?") + "…"


# ── Escape YAML ───────────────────────────────────────────────────────────────
#
# Strings en YAML pueden romperse con:
#   - Comillas dobles dentro de string entre comillas dobles
#   - Backslashes
#   - Caracteres de control
# Usamos siempre comillas dobles y escapamos " y \ — suficiente para textos
# de blog en español. No dependemos de PyYAML para mantener cero deps.

def yaml_string(s: str) -> str:
    """Escapa un string para YAML usando comillas dobles."""
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


# ── Generación del Markdown ───────────────────────────────────────────────────

def generar_markdown(titulo: str, parrafos: list, pregunta: str,
                     category: str, brand: str, fecha: datetime.date) -> str:
    """Genera el contenido completo del .md con frontmatter + body."""

    excerpt = generar_excerpt(parrafos)
    role = ROLE_POR_BRAND.get(brand, ROLE_POR_BRAND["grupo"])
    fecha_iso = fecha.strftime("%Y-%m-%d")

    # Frontmatter
    fm_lines = [
        "---",
        f"title: {yaml_string(titulo)}",
        f"excerpt: {yaml_string(excerpt)}",
        f"brand: {brand}",
        f"category: {yaml_string(category)}",
        f"date: {fecha_iso}",
        "author:",
        f"  name: {yaml_string(AUTOR_NOMBRE)}",
        f"  role: {yaml_string(role)}",
        f"  email: {yaml_string(AUTOR_EMAIL)}",
    ]
    if pregunta:
        fm_lines.append(f"highlight: {yaml_string(pregunta)}")
    fm_lines.append("---")
    frontmatter = "\n".join(fm_lines)

    # Body: párrafos separados por una línea en blanco
    body = "\n\n".join(parrafos)

    return f"{frontmatter}\n\n{body}\n"


# ── Publicación en GitHub ─────────────────────────────────────────────────────

def publicar_en_github(nombre_archivo: str) -> bool:
    """Hace git add / commit / push del .md generado.

    Solo añade ese archivo específico — NO usa 'git add .' para evitar
    arrastrar trabajo en curso del repo al commit del blog. Si tienes
    cambios no commiteados (otros scripts, ajustes al sitio), quedan
    intactos para que los committees aparte."""
    ruta_relativa = f"src/content/perspectivas/{nombre_archivo}"
    try:
        subprocess.run(
            ["git", "add", "--", ruta_relativa],
            cwd=PROYECTO_DIR,
            check=True,
            capture_output=True,
        )
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet", "--", ruta_relativa],
            cwd=PROYECTO_DIR,
            capture_output=True,
        )
        if result.returncode == 0:
            log(f"SIN CAMBIOS PARA COMMIT: {nombre_archivo} (ya estaba en repo)")
            return True

        subprocess.run(
            ["git", "commit", "-m", f"Blog: nuevo artículo — {nombre_archivo}"],
            cwd=PROYECTO_DIR,
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=PROYECTO_DIR,
            check=True,
            capture_output=True,
        )
        log(f"PUBLICADO EN GITHUB: {nombre_archivo}")
        return True
    except subprocess.CalledProcessError as e:
        stderr = e.stderr.decode(errors="replace").strip() if e.stderr else ""
        log(f"ERROR AL PUBLICAR EN GITHUB: {stderr or str(e)}")
        return False
    except FileNotFoundError:
        log("ERROR: git no está instalado o no está en el PATH")
        return False


# ── Procesamiento de carpeta ──────────────────────────────────────────────────

def procesar_carpeta(nombre_carpeta: str, dry_run: bool = False,
                     no_push: bool = False) -> str | None:
    """
    Procesa una carpeta de contenido y genera el artículo .md.
    Devuelve el nombre del archivo generado o None si hubo error.
    """
    carpeta = CONTENIDO_DIR / nombre_carpeta
    txt_path = carpeta / "linkedin_post.txt"

    if not carpeta.is_dir():
        log(f"ERROR: no existe la carpeta '{nombre_carpeta}'")
        return None

    if not txt_path.exists():
        log(f"SIN CONTENIDO: '{nombre_carpeta}' no tiene linkedin_post.txt")
        return None

    with open(txt_path, encoding="utf-8") as f:
        texto = f.read()

    if not texto.strip():
        log(f"SIN CONTENIDO: '{nombre_carpeta}' → linkedin_post.txt está vacío")
        return None

    datos     = parsear_contenido(texto)
    titulo    = datos["titulo"]
    parrafos  = datos["parrafos"]
    pregunta  = datos["pregunta"]
    overrides = datos["overrides"]

    if not titulo:
        log(f"ERROR: no se pudo extraer título de '{nombre_carpeta}'")
        return None

    fecha = fecha_desde_carpeta(nombre_carpeta)

    # Resolver brand y categoría según la jerarquía:
    #   override .txt > día de semana (Cowork) > keywords (fallback)
    bc = resolver_brand_y_categoria(overrides, fecha, texto)
    brand    = bc["brand"]
    category = bc["category"]

    slug_base      = generar_slug_desde_titulo(titulo)
    nombre_archivo = nombre_archivo_disponible(slug_base)

    markdown = generar_markdown(
        titulo=titulo,
        parrafos=parrafos,
        pregunta=pregunta,
        category=category,
        brand=brand,
        fecha=fecha,
    )

    if dry_run:
        print("\n" + "─" * 60)
        print(f"DRY RUN — archivo que se generaría: {nombre_archivo}")
        print(f"Destino: {CONTENT_DIR / nombre_archivo}")
        print("─" * 60)
        print(markdown)
        print("─" * 60 + "\n")
        log(f"DRY RUN: {nombre_carpeta} → {nombre_archivo}")
        return nombre_archivo

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    ruta = CONTENT_DIR / nombre_archivo
    with open(ruta, "w", encoding="utf-8") as f:
        f.write(markdown)

    log(f"PROCESADO: {nombre_carpeta} → {nombre_archivo}")

    if not no_push:
        publicar_en_github(nombre_archivo)
    else:
        log(f"PUSH OMITIDO (--no-push): {nombre_archivo}")

    return nombre_archivo


# ── Modos de ejecución ────────────────────────────────────────────────────────

def modo_automatico(dry_run: bool, no_push: bool) -> None:
    """Busca carpetas de hoy (y V2, V3) y las procesa si no fueron procesadas."""
    hoy        = datetime.date.today().strftime("%Y-%m-%d")
    procesados = leer_procesados()

    patron   = str(CONTENIDO_DIR / f"{hoy}*")
    carpetas = sorted(glob.glob(patron))

    if not carpetas:
        log("SIN CONTENIDO: no hay carpetas nuevas hoy")
        return

    encontradas = 0
    for ruta in carpetas:
        nombre = os.path.basename(ruta)
        if not os.path.isdir(ruta):
            continue
        if nombre in procesados and not dry_run:
            log(f"OMITIDO: {nombre} → ya procesado anteriormente")
            continue
        procesar_carpeta(nombre, dry_run=dry_run, no_push=no_push)
        encontradas += 1

    if encontradas == 0:
        log("SIN CONTENIDO: todas las carpetas de hoy ya fueron procesadas")


def modo_carpeta(nombre: str, dry_run: bool, no_push: bool) -> None:
    """Procesa una carpeta específica sin verificar el log."""
    procesar_carpeta(nombre, dry_run=dry_run, no_push=no_push)


def modo_todos(dry_run: bool, no_push: bool) -> None:
    """Procesa todas las carpetas en CONTENIDO_DIR que no hayan sido procesadas."""
    procesados = leer_procesados()
    patron     = str(CONTENIDO_DIR / "????-??-??*")
    carpetas   = sorted(glob.glob(patron))

    if not carpetas:
        log("SIN CONTENIDO: no se encontraron carpetas en el directorio de contenido")
        return

    for ruta in carpetas:
        nombre = os.path.basename(ruta)
        if not os.path.isdir(ruta):
            continue
        if nombre in procesados and not dry_run:
            log(f"OMITIDO: {nombre} → ya procesado anteriormente")
            continue
        procesar_carpeta(nombre, dry_run=dry_run, no_push=no_push)


# ── Punto de entrada ──────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Automatización del blog Grupo LGO — sitio Astro"
    )
    parser.add_argument(
        "--carpeta", metavar="NOMBRE",
        help="Procesar una carpeta específica, ej: 2026-05-15"
    )
    parser.add_argument(
        "--todos", action="store_true",
        help="Reprocesar todas las carpetas no procesadas"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Mostrar el .md generado sin escribir a disco ni hacer git"
    )
    parser.add_argument(
        "--no-push", action="store_true",
        help="Escribir el .md pero NO hacer git commit + push"
    )
    args = parser.parse_args()

    if args.carpeta:
        modo_carpeta(args.carpeta, dry_run=args.dry_run, no_push=args.no_push)
    elif args.todos:
        modo_todos(dry_run=args.dry_run, no_push=args.no_push)
    else:
        modo_automatico(dry_run=args.dry_run, no_push=args.no_push)


if __name__ == "__main__":
    main()

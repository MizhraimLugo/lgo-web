# Scripts del proyecto Grupo LGO

Automatizaciones para la operación del sitio.

## `nuevo-articulo.py` — Publicación del blog

Convierte carpetas de contenido (`linkedin_post.txt`) en archivos Markdown
con frontmatter para `src/content/perspectivas/`. Astro recompila el sitio
en cada `git push`, y Netlify deploya automáticamente.

### Integración con Cowork (flujo automático completo)

El script está diseñado para encajar con el generador de contenido en
Cowork. Cowork genera contenido diario lunes-sábado en carpetas
`C:\Users\edgar\Contenido Grupo LGO\YYYY-MM-DD\` con tres archivos:

- `linkedin_post.txt` (lunes-viernes)
- `instagram_caption.txt` (lunes-sábado)
- `slide_01.png`, `slide_02.png`, ... (lunes-sábado)

El script lee SOLO `linkedin_post.txt`. Esto significa:

- **Lunes-viernes**: genera artículo de blog automáticamente
- **Sábado**: no hace nada (Cowork no genera linkedin_post.txt ese día — sábado es solo Instagram)
- **Domingo**: no hace nada (no hay contenido)

El flujo completo:

```
Cowork (Anthropic Scheduled)              Script local (Windows)         Netlify
─────────────────────────────             ─────────────────────────      ─────────
Lunes 09:00 → genera contenido            
   → carpeta 2026-05-11\ con .txt + PNG
                                          Lunes 18:00 (Tarea programada)
                                          → corre nuevo-articulo.py
                                          → detecta carpeta de hoy
                                          → genera .md con frontmatter
                                             según el calendario del día
                                          → git add + commit + push
                                                                          → detecta push
                                                                          → npm run build
                                                                          → deploya a lgo.mx
                                                                            (60-120 segundos)
```

### Workflow operativo

```
1. CREAR contenido del día
   ────────────────────────
   C:\Users\edgar\Contenido Grupo LGO\2026-05-15\
     └── linkedin_post.txt        (tu texto plano)

2. EJECUTAR el script
   ──────────────────
   cd "C:\Users\edgar\LGO web"
   python scripts\nuevo-articulo.py

3. AUTOMÁTICO desde aquí
   ─────────────────────
   ↓ El script detecta categoría, genera .md, lo escribe en src/content/perspectivas/
   ↓ Git add + commit + push automático
   ↓ GitHub recibe el push
   ↓ Netlify detecta cambio
   ↓ npm run build automático (60-120 segundos)
   ↓ Sitio actualizado en lgo.mx
```

### Formato del `linkedin_post.txt`

```
Título del artículo aquí

Primer párrafo del cuerpo. Será el excerpt que aparece en las cards del blog
(truncado a ~200 caracteres).

Segundo párrafo. Puede tener varias oraciones y mantiene formato libre.

Tercer párrafo, cuarto párrafo, los que necesites.

¿Pregunta de cierre que termina con signo de interrogación?
```

**Reglas:**

- **Primera línea no vacía** = título del artículo
- **Párrafos** separados por una línea en blanco
- **Último párrafo con `?`** = `highlight` (caja naranja al final del artículo)
- Si no hay pregunta final, no se genera highlight (válido)

### Asignación automática de brand y categoría

Tres niveles de prioridad, de mayor a menor:

#### 1. Override desde el `.txt` (máxima prioridad)

Si el `.txt` empieza con líneas tipo `KEY: valor`, esas anulan el resto.
Útil cuando el contenido del día se sale del calendario o quieres forzar
un brand específico.

```
BRAND: contadores
CATEGORY: Planeación fiscal
HIGHLIGHT: ¿Tu negocio está listo para el cierre?

Título del artículo aquí

Primer párrafo...
```

Overrides soportados (case-insensitive):
- `BRAND:` — uno de: `abogados`, `contadores`, `tecnologia`, `marketing`, `grupo`
- `CATEGORY:` — texto libre
- `HIGHLIGHT:` — pregunta de cierre (alternativa al último párrafo con `?`)

#### 2. Día de la semana del calendario Cowork

Si no hay overrides, se usa el calendario:

| Día | Brand | Categoría |
|---|---|---|
| Lunes | `grupo` | Emprendimiento |
| Martes | `abogados` | Derecho |
| Miércoles | `grupo` | Tecnología Empresarial |
| Jueves | `contadores` | Fiscal |
| Viernes | `grupo` | Liderazgo |
| Sábado | (no se publica blog — solo Instagram) | — |

Esto coincide exactamente con tu calendario de Cowork. Cambiar este mapeo
es editar `DIA_A_BRAND` en el script.

> **Cuando lances LGO Tecnología o LGO Marketing**, cambia el brand de
> miércoles a `tecnologia` (y para marketing, asígnale un día). El
> artículo se publica automáticamente en su sección filtrada del blog.

#### 3. Detección por keywords (fallback)

Solo se usa si la fecha de la carpeta no encaja en el calendario (caso raro,
por ejemplo carpeta de domingo o sin formato YYYY-MM-DD). En ese caso busca
palabras clave en el texto:

| Categoría | Brand | Palabras clave |
|---|---|---|
| Fiscal | contadores | SAT, declaración, IVA, ISR, CFDI, deducción, RESICO |
| Derecho Laboral | abogados | jornada, nómina, trabajador, STPS, despido, finiquito |
| Propiedad Intelectual | abogados | marca, IMPI, patente, derechos de autor |
| Contratos | abogados | arrendamiento, cláusula, convenio |
| Derecho Corporativo | abogados | sociedad, accionistas, S.A., gobierno corporativo |
| Tecnología Empresarial | grupo | IA, automatización, transformación digital |
| Emprendimiento | grupo | emprendedor, startup, PyME, nearshoring |
| **Empresarial** (fallback final) | **grupo** | (cuando nada matchea) |

### Carpetas V2, V3 — múltiples artículos el mismo día

```
2026-05-15\         ← procesada en la mañana
2026-05-15V2\       ← procesada en la tarde
2026-05-15V3\       ← otra del mismo día
```

El script las procesa todas si están en `CONTENIDO_DIR` y no aparecen
en el log como ya procesadas.

### Modos de ejecución

```bash
# Automático: carpetas de HOY que no se han procesado
python scripts\nuevo-articulo.py

# Carpeta específica (ignora si ya estaba procesada)
python scripts\nuevo-articulo.py --carpeta "2026-05-15"

# Reprocesar TODAS las carpetas pendientes
python scripts\nuevo-articulo.py --todos
```

### Flags útiles para pruebas

```bash
# Dry-run: muestra el .md que se generaría, NO escribe nada
python scripts\nuevo-articulo.py --carpeta "2026-05-15" --dry-run

# Escribir el .md pero NO hacer git commit + push
python scripts\nuevo-articulo.py --carpeta "2026-05-15" --no-push
```

`--dry-run` es útil para validar el output antes de comprometerse. `--no-push` es útil cuando estás trabajando en local y no quieres ensuciar el repo con cada prueba.

### Configuración requerida para `git push` automático

Para que el push funcione sin intervención:

1. **Git instalado** y en el `PATH` del sistema.
2. **Repo configurado** en `C:\Users\edgar\LGO web` (que apunte al remoto correcto):
   ```bash
   cd "C:\Users\edgar\LGO web"
   git remote -v   # debe mostrar origin → github.com/.../lgo-web.git
   ```
3. **Credenciales guardadas** — o usas:
   - **SSH key** registrada en GitHub (recomendado: cero passwords)
   - **Personal Access Token (PAT)** guardado en Windows Credential Manager
   - **GitHub CLI** (`gh auth login`) — más fácil de configurar

Si el `git push` falla, el script registra el error en el log y SÍ deja el `.md` escrito en local. Puedes hacer el push manual desde VS Code o terminal.

### Logs

Cada ejecución se registra en:

```
C:\Users\edgar\LGO web\logs\blog-auto.log
```

Líneas tipo:

```
[2026-05-15 10:00:01] PROCESADO: 2026-05-15 → declaracion-anual-personas-fisicas-2026.md
[2026-05-15 10:00:02] PUBLICADO EN GITHUB: declaracion-anual-personas-fisicas-2026.md
```

El script usa este log para saber qué carpetas ya procesó. Si quieres
reprocesar manualmente, usa `--carpeta NOMBRE` (ignora el log para esa carpeta).

### Programar ejecución automática para que Cowork → blog sea sin manos

**Una sola tarea programada de Windows** que corre cada día a una hora razonable
*después* de que Cowork haya terminado de generar el contenido.

Pasos:

1. Abrir **Programador de tareas** de Windows (`taskschd.msc`)
2. Acción → "Crear tarea básica"
3. **Nombre:** `LGO Blog Auto`
4. **Disparador:** "Diariamente", hora que prefieras
   - Recomendado: **30 minutos después** de la hora a la que corre Cowork
   - Por ejemplo, si Cowork corre a las 10:00, tu script a las 10:30
5. **Acción:** "Iniciar un programa"
   - **Programa:** `python.exe` (o ruta completa: `C:\Python314\python.exe`)
   - **Argumentos:** `"C:\Users\edgar\LGO web\scripts\nuevo-articulo.py"`
   - **Iniciar en:** `C:\Users\edgar\LGO web`
6. Click "Finalizar"

Lo que pasa cada día:
- Lunes-Viernes: encuentra carpeta `YYYY-MM-DD`, genera .md, hace push → Netlify deploya
- Sábado: encuentra carpeta `YYYY-MM-DD`, NO encuentra `linkedin_post.txt`, log dice "SIN CONTENIDO" y sale limpio
- Domingo: no hay carpeta del día, log dice "SIN CONTENIDO" y sale limpio
- Si por algún motivo Cowork no generó: log dice "SIN CONTENIDO" y sale limpio. Cero error.

#### Si generas 2 contenidos diarios (carpetas V2)

Cowork puede crear `2026-05-15` en la mañana y `2026-05-15V2` en la tarde.
Tu tarea programada con una sola corrida diaria procesará ambas en su próxima
ejecución (el script busca todas las variantes V2, V3, etc.).

Alternativa: crear **dos** tareas programadas (ej. una a las 10:30 y otra a
las 16:30) para que los V2 se publiquen el mismo día sin esperar al siguiente.

---

## Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| `ERROR: no existe la carpeta '...'` | Typo en el nombre, o la carpeta no está en `C:\Users\edgar\Contenido Grupo LGO\` | Revisa que la carpeta exista |
| `SIN CONTENIDO: ... no tiene linkedin_post.txt` | La carpeta existe pero falta el archivo | Crear el `linkedin_post.txt` dentro |
| `ERROR: no se pudo extraer título` | El `.txt` empieza con líneas vacías o no tiene texto | Verifica que la primera línea sea el título |
| `ERROR AL PUBLICAR EN GITHUB: ...` | Repo no configurado, sin permisos, o conflict | Hacer push manual con `git push origin main`, ver el detalle del error |
| Categoría detectada incorrectamente | El texto no contiene las palabras clave esperadas | Ajustar arrays `CATEGORIAS` o editar el `.md` manualmente después |
| El `.md` se ve raro en el sitio | Caracteres especiales sin escapar en el título | El script escapa `"` y `\`, otros chars deben estar bien — si encuentras un caso, repórtalo |

### Cambiar manualmente un artículo recién generado

Si la categoría detectada no fue la correcta, o quieres cambiar algo:

1. Abre `src/content/perspectivas/[slug].md` en VS Code
2. Edita el frontmatter o el body
3. Guarda
4. Commit + push (VS Code lo hace en su panel de Source Control con un click)

---

## Tras un cambio en el script

Si modificas `CATEGORIAS`, `ROLE_POR_BRAND`, o cualquier otra lógica:

1. Prueba con `--dry-run` primero para verificar
2. Si está bien, commitea el cambio del script junto con cualquier ajuste relacionado
3. Las próximas ejecuciones del script usarán la nueva lógica

---

## Archivos relacionados en el proyecto

- `src/content.config.ts` — Schema Zod de la colección (campos válidos del frontmatter)
- `src/data/perspectivas.ts` — Helpers de lectura (filtros, ordenamiento)
- `src/data/brands.ts` — Tipo `LgoPracticeId` (los brands válidos)
- `src/data/README.md` — Estrategia del data layer

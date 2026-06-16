# Data layer — Grupo LGO

Fuente única de verdad para todo lo que el sitio sabe del ecosistema.

## Principio rector

> **El data layer dicta cuántas sub-marcas hay, no el código.**
>
> La narrativa nunca cuenta. Solo describe.

Lanzar una nueva división del ecosistema (ej. LGO Tecnología) **no requiere
refactor**. Es flip de un flag + creación de una página + (opcional) FAQs y servicios.

## Archivos

| Archivo | Propósito |
|---|---|
| `business.ts` | NAP, datos institucionales, contacto. Description abstracta — no lista servicios. |
| `brands.ts` | Las marcas del ecosistema. Fuente de verdad de qué es Grupo LGO. |
| `services.ts` | Catálogo de servicios por práctica. Iterables por sub-marca. |
| `faqs.ts` | FAQs por sub-marca. Cada práctica con su bloque. |
| `perspectivas-preview.ts` | Artículos del blog (placeholder hasta Fase 3 con Content Collections). |
| `sectores.ts` | Sectores con experiencia. Compartidos entre todas las prácticas. |
| `cursos-preview.ts` | Catálogo de cursos. Mezcla gratis / online / presencial. |
| `nav.ts` | Items de navegación. |

## Taxonomía de marcas

```ts
LgoPracticeId = 'abogados' | 'contadores' | 'tecnologia' | 'marketing'
BrandId       = 'grupo' | LgoPracticeId | 'facturacion' | 'lorenzana'
```

- **`grupo`** — entidad paraguas. Representa el ecosistema completo.
- **`LgoPracticeId`** — las cuatro firmas internas. Tipo cerrado deliberadamente:
  añadir una quinta es decisión estratégica, no solo data entry.
- **`facturacion`** — servicio LGO con sitio externo propio (lgo-facturacion.com).
  No es una práctica con página interna, pero SÍ es oferta de LGO: aparece en el
  menú "Servicios". Enlace externo (target=_blank, ↗), sin logo en el sitio.
- **`lorenzana`** — marca externa relacionada (otra paleta, otro sitio). No es
  una sub-marca de LGO; es una marca aliada del ecosistema. Lleva el flag `ally: true`.

### El flag `ally`

Distingue las marcas externas que **no son oferta de LGO** (marcas aliadas, ej.
Lorenzana) de las que sí lo son (ej. Facturación). Solo las que NO son aliadas
aparecen en el menú "Servicios".

## El flag `published`

Cada brand tiene `published: boolean`.

- **`published: true`** → aparece en nav, footer, ecosistema de la landing,
  JSON-LD `subOrganization`, sitemap (si tiene página).
- **`published: false`** → reservada. Existe en el data layer (el slug está
  apartado, el tipo está definido), pero no se renderiza al visitante.

**Estado al momento de escribir este README:**

| Brand | Published |
|---|---|
| `grupo` | ✅ |
| `abogados` | ✅ |
| `contadores` | ✅ |
| `tecnologia` | ❌ (reservada) |
| `marketing` | ❌ (reservada) |
| `facturacion` | ✅ (externa) |
| `lorenzana` | ✅ (aliada externa) |

## Cómo lanzar una nueva sub-marca

Pasos cuando se decida publicar (ej.) **LGO Tecnología**:

1. **`brands.ts`** — cambiar `published: false` por `published: true`.
2. **`src/pages/tecnologia/index.astro`** — crear la página (copiar `/abogados/`
   o `/contadores/` como template; cambiar contenido).
3. **`services.ts`** — añadir servicios con `brand: 'tecnologia'`.
4. **`faqs.ts`** — exportar `faqsTecnologia` y mapearlo en `FAQS_BY_BRAND`.
5. **`perspectivas-preview.ts`** — los artículos con `brand: 'tecnologia'` se
   filtran automáticamente fuera mientras `published: false`, y aparecen
   automáticamente cuando se publica.
6. **`nav.ts`** — añadir el link (considerar agrupar si los items pasan de 5).

Eso es todo. La landing, el JSON-LD, el ecosistema de la home, el footer,
los breadcrumbs y el sitemap se actualizan **solos** porque iteran sobre los
helpers que filtran por `published`.

## Helpers — usar siempre estos en plantillas

| Helper | Cuándo |
|---|---|
| `publishedSubBrands` | JSON-LD `subOrganization`, footer "Ecosistema" (logos internos) |
| `publishedServiceBrands` | Menú "Servicios" del nav (marcas LGO publicadas, sin aliadas) |
| `publishedExternalBrands` | Footer "Ecosistema" (marcas externas con ↗: Facturación, Lorenzana) |
| `ecosystemBrands` | Grid del ecosistema en la landing (todas las publicadas no-grupo) |
| `isPublishedPractice(id)` | Filtros runtime (artículos del blog, servicios agregados) |
| `getBrand(id)` | Acceso puntual a una marca específica |

**Nunca** iterar `brands` directamente en una plantilla — siempre via helper.
Esto garantiza que marcas reservadas no se filtren accidentalmente.

## Lo que NO debe pasar nunca

- Que el sitio diga "tres frentes" / "cuatro prácticas" / "nuestras dos firmas".
  Cualquier número en copy condena al refactor en cada release.
- Que un archivo importe `lorenzana` por nombre cuando podría usar `ecosystemBrands`.
- Que JSON-LD nombre servicios específicos en lugar de tipos abstractos
  (`ProfessionalService` cubre todas las prácticas; `LegalService` solo legal).
- Que se cree un componente que recibe `'abogados' | 'contadores'` cuando podría
  recibir `LgoPracticeId`.

## Convenciones de IDs

- Lowercase, sin acentos (`tecnologia`, no `tecnología`).
- Una sola palabra. Si el nombre tiene dos, separar con guión (`marketing-digital`).
- Coherente con el slug de la URL (`/tecnologia/` → id `'tecnologia'`).

// ════════════════════════════════════════════════════════════════
//  TRIM LOGOS — recorta whitespace de los PNG y los optimiza
// ════════════════════════════════════════════════════════════════
//
// Toma los PNG originales en public/images/logos/source/ (típicamente
// cuadrados 1080x1080 con mucho espacio en blanco alrededor del logo)
// y genera versiones limpias en public/images/logos/ listas para web.
//
// Cómo usar:
//
//   1. Pon los originales en public/images/logos/source/ con estos nombres:
//        grupo-lgo.png        (logo del paraguas Grupo LGO)
//        lgo-abogados.png     (logo de LGO Abogados & Consultores)
//        lgo-contadores.png   (logo de LGO Contadores & Consultores)
//
//   2. Corre:
//        node scripts/trim-logos.mjs
//
//   3. Las versiones recortadas quedan en public/images/logos/ con el
//      mismo nombre. El Nav, Footer y sub-marcas las usan automáticamente.
//
// Si añades una nueva sub-marca (ej. LGO Tecnología), copia su logo a
// source/ con el nombre del id (lgo-tecnologia.png) y vuelve a correr.

import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE_DIR = join(ROOT, 'public', 'images', 'logos', 'source');
const OUTPUT_DIR = join(ROOT, 'public', 'images', 'logos');

// Cowork genera los logos con nombres tipo "GrupoLGO.png", pero el sitio
// los espera con la convención kebab-case basada en el id de la marca.
// Este mapa traduce nombres conocidos. Si añades un logo nuevo (ej. LGO
// Tecnología cuando se publique), añade su entry aquí.
const NAME_MAP = {
  'grupolgo.png':      'grupo-lgo.png',
  'lgoabogados.png':   'lgo-abogados.png',
  'lgocontadores.png': 'lgo-contadores.png',
  'lgotecnologia.png': 'lgo-tecnologia.png',
  'lgomarketing.png':  'lgo-marketing.png'
};

function normalizeOutputName(filename) {
  const lower = filename.toLowerCase();
  return NAME_MAP[lower] || lower;
}

// Configuración del trim. Los PNG vienen con fondo blanco/casi-blanco.
// Sin especificar background, sharp toma el color del top-left pixel como
// referencia — más robusto que asumir #FFFFFF exacto cuando hay anti-aliasing
// o JPEG compression artifacts en los bordes.
// threshold: tolerancia para considerar un pixel "fondo". Mayor = recorta más.
const TRIM_CONFIG = {
  threshold: 50
};

// Padding interno después de recortar — un pequeño aire alrededor del logo
// para que no quede pegado al borde cuando se renderice pequeño.
const PADDING = 8;

async function trimLogo(srcPath, outPath) {
  const name = basename(srcPath);
  try {
    const image = sharp(srcPath);
    const meta = await image.metadata();

    // Trim del whitespace blanco
    let trimmed = image.trim(TRIM_CONFIG);

    // Añadir padding pequeño para que el logo respire
    if (PADDING > 0) {
      trimmed = trimmed.extend({
        top: PADDING, bottom: PADDING, left: PADDING, right: PADDING,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      });
    }

    // Guardar como PNG optimizado
    const buffer = await trimmed.png({ compressionLevel: 9 }).toBuffer();
    const outMeta = await sharp(buffer).metadata();

    await fs.writeFile(outPath, buffer);

    const inSizeKB = ((await fs.stat(srcPath)).size / 1024).toFixed(1);
    const outSizeKB = (buffer.length / 1024).toFixed(1);

    console.log(`  ${name}`);
    console.log(`    original:  ${meta.width}×${meta.height}  ${inSizeKB} KB`);
    console.log(`    recortado: ${outMeta.width}×${outMeta.height}  ${outSizeKB} KB`);
    console.log();
  } catch (err) {
    console.error(`  ${name} — ERROR: ${err.message}\n`);
  }
}

async function main() {
  console.log('\n═══ TRIM LOGOS ═══');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch {}

  let files;
  try {
    files = await fs.readdir(SOURCE_DIR);
  } catch (err) {
    console.error(`ERROR: no existe ${SOURCE_DIR}`);
    console.error('Crea la carpeta y coloca los PNG originales adentro.');
    process.exit(1);
  }

  const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));
  if (pngs.length === 0) {
    console.error('No se encontraron archivos .png en source/');
    process.exit(1);
  }

  console.log(`Procesando ${pngs.length} archivo(s)...\n`);
  for (const file of pngs) {
    const src = join(SOURCE_DIR, file);
    const outName = normalizeOutputName(file);
    const out = join(OUTPUT_DIR, outName);
    if (outName !== file.toLowerCase()) {
      console.log(`  → renombrado a: ${outName}`);
    }
    await trimLogo(src, out);
  }

  console.log('═══ COMPLETADO ═══\n');
}

main().catch((err) => {
  console.error('Fallo:', err);
  process.exit(1);
});

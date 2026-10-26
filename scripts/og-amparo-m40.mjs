// ════════════════════════════════════════════════════════════════
//  OG IMAGE — Amparo Modalidad 40
// ════════════════════════════════════════════════════════════════
//
// Genera public/og-amparo-modalidad-40.jpg (1200×630), la imagen que se
// comparte al enlazar /pensiones/amparo-modalidad-40/ en WhatsApp, LinkedIn o
// X. Sobria: fondo crema de la paleta, filete naranja de acento, el logo de
// LGO Abogados y el nombre del servicio.
//
// Cómo usar:
//
//   node scripts/og-amparo-m40.mjs
//
// Se corre a mano y el resultado se commitea (igual que los logos recortados
// de trim-logos.mjs): el build de Astro no la regenera.
//
// Los colores son los tokens de src/styles/global.css. Si cambia la paleta,
// cámbialos aquí también — sharp no lee el CSS.

import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LOGO = join(ROOT, 'public', 'images', 'logos', 'lgo-abogados.png');
const SALIDA = join(ROOT, 'public', 'og-amparo-modalidad-40.jpg');

const W = 1200;
const H = 630;

// Tokens de la paleta (global.css)
const CREMA = '#FAF8F4';
const TINTA = '#1A1A1A';
const GRIS = '#555555';
const NARANJA = '#D4541A';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${CREMA}"/>

  <!-- Filete de acento al borde izquierdo: la marca sin invadir la superficie -->
  <rect x="0" y="0" width="14" height="${H}" fill="${NARANJA}"/>

  <!-- Rótulo -->
  <text x="88" y="190" fill="${NARANJA}"
        font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700"
        letter-spacing="5">PENSIONES · IMSS</text>

  <!-- Nombre del servicio -->
  <text x="84" y="300" fill="${TINTA}"
        font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="700"
        letter-spacing="-2">Amparo Modalidad 40</text>

  <!-- Bajada -->
  <text x="88" y="372" fill="${GRIS}"
        font-family="Arial, Helvetica, sans-serif" font-size="34">Revisamos si procede un amparo en tu caso.</text>

  <!-- Filete y firma -->
  <rect x="88" y="452" width="72" height="5" fill="${NARANJA}"/>
  <text x="88" y="536" fill="${TINTA}"
        font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">LGO Abogados &amp; Consultores</text>
  <text x="88" y="576" fill="${GRIS}"
        font-family="Arial, Helvetica, sans-serif" font-size="26">Guadalajara, Jalisco</text>
</svg>`;

async function main() {
  const logo = await sharp(LOGO).resize({ height: 92, fit: 'inside' }).png().toBuffer();
  const { width: logoW = 0 } = await sharp(logo).metadata();

  const buffer = await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: 72, left: W - 88 - logoW }])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toBuffer();

  await fs.writeFile(SALIDA, buffer);
  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`\n  og-amparo-modalidad-40.jpg  ${W}×${H}  ${kb} KB`);
  console.log(`  ${SALIDA}\n`);
}

main().catch((err) => {
  console.error('Fallo:', err);
  process.exit(1);
});

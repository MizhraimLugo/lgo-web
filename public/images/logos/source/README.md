# Logos originales — instrucciones

Guarda aquí los PNG originales de los logos con estos nombres exactos:

| Archivo | Contenido |
|---|---|
| `grupo-lgo.png` | Logo del paraguas Grupo LGO (rectángulo naranja con "Grupo LGO") |
| `lgo-abogados.png` | Logo de LGO Abogados & Consultores (balanza + texto) |
| `lgo-contadores.png` | Logo de LGO Contadores & Consultores (documento + texto) |

Una vez guardados, corre desde la raíz del proyecto:

```bash
node scripts/trim-logos.mjs
```

El script recortará el whitespace blanco y guardará las versiones optimizadas
en `public/images/logos/`, donde Nav, Footer y sub-marcas las recogen
automáticamente.

## Cuando agregues una nueva sub-marca

Cuando publiques LGO Tecnología o LGO Marketing, guarda su logo aquí con el
nombre de su id:

- `lgo-tecnologia.png`
- `lgo-marketing.png`

Vuelve a correr el script y queda integrado en todo el sitio.

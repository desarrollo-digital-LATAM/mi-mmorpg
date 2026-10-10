# Hack the Andes — biblioteca integrada de assets

## Qué incluye esta versión

Esta es la **versión integrada** del paquete, con recortes de tus capturas y con los packs originales que subiste.

### Carpetas principales

- `00_REFERENCIAS/`: imágenes base y hojas de referencia usadas para recortar.
- `01_ESCENARIO/`: sprites de escenario recortados desde las capturas iniciales.
- `02_ICONOS/`:
  - `HABILIDADES/` (48)
  - `SKILLS_ASESINO/` (48 + miniaturas 32x32)
  - `SKILLS_GUERRERO/` (48 + miniaturas 32x32)
  - `DEBUFFS/` (48 + miniaturas 32x32)
  - `LOOT_CRAFTPIX/` (48 transparentes + 48 con fondo; originales del ZIP)
- `03_ARMAS/`:
  - `BASTONES/` (48)
  - `HACHAS/` (48)
- `04_PERSONAJES/MAGE/`:
  - `mage_sheet_original.png`
  - `retratos/`
  - `acciones/` con recortes por bloque: run, walk, idle, death, attack, hurt y fx.
- `05_MONSTRUOS/CRAFTPIX/`:
  - 48/50 monstruos del pack principal en versión transparente y con fondo
  - bonus de 2 monstruos extra
- `06_DUNGEON/`: 3 PNG originales del ZIP `dungeon.zip`.
- `07_FUENTES_ORIGINALES/`: los ZIP fuente que subiste, para mantener trazabilidad.
- `catalogo.html`: catálogo visual offline.
- `inventario_sprites.csv`: manifest con rutas, nombres, origen y observaciones.

## Notas importantes

1. **Escenario, iconos antiguos y nuevos recortes**: provienen de capturas; por tanto, en esos casos no siempre son sprites fuente perfectos.
2. **Loot, monstruos y dungeon**: provienen de archivos originales subidos por ti, por lo que son más recomendables para producción.
3. **Mage**: se dejó organizado por secciones (action strips) y retratos, porque la imagen subida es una lámina compilada, no un spritesheet exportado en archivos individuales separados.
4. Mantén el filtrado del motor en **Nearest / Point** para conservar el pixel art.
5. Revisa siempre la licencia de CraftPix antes de redistribuir assets fuera del proyecto.

# Inventario de prototipos de Fase 1

Los archivos de `public/assets/prototypes/` son copias locales de trabajo excluidas por `.gitignore`. No se deben versionar ni publicar como un paquete de arte. El manifest local asociado es `public/assets/prototypes/manifest.json`; `npm run assets:check` verifica sus hashes, dimensiones y presencia de la fuente local.

| ID | Runtime local | Fuente local | SHA-256 | Dimensiones | Uso en Fase 1 |
|---|---|---|---|---|---|
| swordsman-level-1-idle | `assets/prototypes/swordsman-level-1/Swordsman_lvl1_Idle_without_shadow.png` | `asset-workbench/candidates/swordsman-level-1/PNG/Swordsman_lvl1/Without_shadow/Swordsman_lvl1_Idle_without_shadow.png` | `a9a1ceda282514aa146a1a2162f25b8ed61a783324e2b7ce778e48b6a9b59d52` | 768x256 | Diagnostico de cuatro filas indexadas. |
| swordsman-level-1-walk | `assets/prototypes/swordsman-level-1/Swordsman_lvl1_Walk_without_shadow.png` | `asset-workbench/candidates/swordsman-level-1/PNG/Swordsman_lvl1/Without_shadow/Swordsman_lvl1_Walk_without_shadow.png` | `3604606fa2a5273b4a7386a98215241f582a7931f1e2d5bd5ff2cabacde63627` | 384x256 | Diagnostico de cuatro filas indexadas. |
| paths-and-roads-ground-grass | `assets/prototypes/paths-and-roads/Ground_grass.png` | `asset-workbench/candidates/paths-and-roads/PNG_Tiled/Ground_grass.png` | `d931a1daafbd64f81caae5547c5cbf05163f3c02d83b2385d289031f41baea44` | 272x496 | Muestra de tileset, no mapa. |
| paths-and-roads-road5 | `assets/prototypes/paths-and-roads/Road5.png` | `asset-workbench/candidates/paths-and-roads/PNG_Tiled/Road5.png` | `cc701767611fbdb5a141ca2afd0950db10c6126b7fad2abce82167597fa7a59e` | 240x416 | Muestra de tileset, no mapa. |
| chapel-exterior | `assets/prototypes/chapel/Exterior.png` | `asset-workbench/candidates/chapel-outdoor-and-characters/Tiled_files/Exterior.png` | `a2099663c5dbbcba4ad5efdae6a2990c78684b1ce53e93808416e3d92e2ae32b` | 256x304 | Muestra de tileset, no plaza. |

## Animacion comprobada

El TMX de Swordsman declara celdas de 16x16, pero los PNG completos y los pasos del TMX demuestran sprites de 64x64: cada frame ocupa 4x4 celdas. No se reescalan.

| Estado | Hoja | Estructura | Duracion por frame | Duracion de ciclo |
|---|---|---|---|---|
| Walk | 384x256 | 6 columnas x 4 filas de 64x64 | 150 ms | 900 ms |
| Idle | 768x256 | 12 columnas x 4 filas de 64x64 | 150 ms | 1800 ms |

El TMX define secuencias cada cuatro IDs de tile a 150 ms. No nombra las cuatro filas de la hoja como frente, atras, izquierda o derecha. La aplicacion muestra `Fila 0` a `Fila 3` sin convertir esos indices en direcciones. Por tanto, anclaje de pies y hitbox siguen sin confirmar; no se implementan movimiento, fisica, camara ni mapa.

## Licencia y limites

Cada candidato conserva una referencia local `LICENSE-source.txt` que apunta a `https://craftpix.net/file-licenses/`. El registro identifica la fuente, no acredita la adquisicion ni autoriza redistribuir los PNG fuente en un repositorio publico. Aqua Slime no figura en este inventario ni se carga en runtime.

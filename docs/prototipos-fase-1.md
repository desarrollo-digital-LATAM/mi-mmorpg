# Inventario de prototipos de Fase 1

Los archivos de `public/assets/prototypes/` son copias locales de trabajo excluidas por `.gitignore`. No se deben versionar ni publicar como un paquete de arte. El manifest local asociado es `public/assets/prototypes/manifest.json`; `npm run assets:check` verifica sus hashes, dimensiones y presencia de la fuente local.

| ID | Runtime local | Fuente local | SHA-256 | Dimensiones | Uso en Fase 1 |
|---|---|---|---|---|---|
| swordsman-level-1-idle | `assets/prototypes/swordsman-level-1/Swordsman_lvl1_Idle_without_shadow.png` | `asset-workbench/candidates/swordsman-level-1/PNG/Swordsman_lvl1/Without_shadow/Swordsman_lvl1_Idle_without_shadow.png` | `a9a1ceda282514aa146a1a2162f25b8ed61a783324e2b7ce778e48b6a9b59d52` | 768x256 | Diagnostico de cuatro filas indexadas. |
| swordsman-level-1-walk | `assets/prototypes/swordsman-level-1/Swordsman_lvl1_Walk_without_shadow.png` | `asset-workbench/candidates/swordsman-level-1/PNG/Swordsman_lvl1/Without_shadow/Swordsman_lvl1_Walk_without_shadow.png` | `3604606fa2a5273b4a7386a98215241f582a7931f1e2d5bd5ff2cabacde63627` | 384x256 | Diagnostico de cuatro filas indexadas. |
| paths-and-roads-ground-grass | `assets/prototypes/paths-and-roads/Ground_grass.png` | `asset-workbench/candidates/paths-and-roads/PNG_Tiled/Ground_grass.png` | `d931a1daafbd64f81caae5547c5cbf05163f3c02d83b2385d289031f41baea44` | 272x496 | Muestra de tileset, no mapa. |
| paths-and-roads-road5 | `assets/prototypes/paths-and-roads/Road5.png` | `asset-workbench/candidates/paths-and-roads/PNG_Tiled/Road5.png` | `cc701767611fbdb5a141ca2afd0950db10c6126b7fad2abce82167597fa7a59e` | 240x416 | Muestra de tileset, no mapa. |
| chapel-exterior | `assets/prototypes/chapel/Exterior.png` | `asset-workbench/candidates/chapel-outdoor-and-characters/Tiled_files/Exterior.png` | `a2099663c5dbbcba4ad5efdae6a2990c78684b1ce53e93808416e3d92e2ae32b` | 256x304 | Muestra de tileset, no plaza. |
| base-4-direction-unarmed-idle | `assets/prototypes/base-4-direction/Unarmed_Idle_without_shadow.png` | `asset-workbench/candidates/base-4-direction/PNG/Unarmed/Without_shadow/Unarmed_Idle_without_shadow.png` | `aefad5e0900791fe8be411399b26a1e287283c4636a9921fc1024c23e802b850` | 768x256 | Idle 4 direcciones; filas contrastadas con ASEPRITE. |
| base-4-direction-unarmed-walk | `assets/prototypes/base-4-direction/Unarmed_Walk_without_shadow.png` | `asset-workbench/candidates/base-4-direction/PNG/Unarmed/Without_shadow/Unarmed_Walk_without_shadow.png` | `07538f1ad5f77fd07a6fe112e87071c91cba19850ac6bf3630fb308556953de4` | 384x256 | Walk 4 direcciones; filas contrastadas con ASEPRITE. |

## Animacion comprobada

El TMX de Swordsman declara celdas de 16x16, pero los PNG completos y los pasos del TMX demuestran sprites de 64x64: cada frame ocupa 4x4 celdas. No se reescalan.

| Estado | Hoja | Estructura | Duracion por frame | Duracion de ciclo |
|---|---|---|---|---|
| Walk | 384x256 | 6 columnas x 4 filas de 64x64 | 150 ms | 900 ms |
| Idle | 768x256 | 12 columnas x 4 filas de 64x64 | 150 ms | 1800 ms |

El TMX define secuencias cada cuatro IDs de tile a 150 ms. No nombra las cuatro filas de la hoja como frente, atras, izquierda o derecha. La aplicación de diagnóstico muestra `Fila 0` a `Fila 3` sin convertir esos índices en direcciones. Por tanto, el anclaje de pies y la hitbox del Swordsman siguen sin confirmar; la locomoción provisional descrita abajo no usa ni valida ese arte.

## Licencia y limites

Cada candidato conserva una referencia local `LICENSE-source.txt` que apunta a `https://craftpix.net/file-licenses/`. El registro identifica la fuente, no acredita la adquisicion ni autoriza redistribuir los PNG fuente en un repositorio publico. Aqua Slime no figura en este inventario ni se carga en runtime.

## Revisión anterior de candidatos adicionales

En una inspección anterior del checkout `asset-workbench/incoming/` no estaba presente, por lo que Base 4-Direction, Tiny Hero y Undead no se auditaron entonces. El ZIP Base 4-Direction se recibió después y se audita a continuación; Tiny Hero y Undead siguen sin integrar.

## Prueba de movimiento con vista provisional

`WorldTestScene` es una escena de prueba separada de la galería. Su mapa propio de Path and Road mide 1280×960 px (80×60 celdas de 16 px), con borde y spawn visible. No es el TMX original ni un entorno final. Un cuerpo Arcade de 14×10 controla al jugador, limitado por el mundo; WASD/flechas mueven en cuatro ejes y la diagonal se normaliza. La cámara sigue al cuerpo dentro de los límites.

`UnarmedPlayerView` reemplaza los asteriscos en `WorldTestScene` y consume posición/estado de `PlayerController`; no modifica entrada, velocidad ni cuerpo Arcade. `AsteriskPlayerView` se conserva como alternativa local no activa. `P` abre la galería conservada; `W` vuelve al mundo de prueba.

Esta prueba no incorpora obstáculos, colisiones de escenario, combate, enemigos, vida ni clases. No certifica la Fase 1 final ni elimina la necesidad de convertir el mapa en un nivel de juego con datos de colisión/spawn.

### Mapa de prueba Path and Road

El tileset adicional `paths-and-roads-road5-grass` está en `assets/prototypes/paths-and-roads/Road5_grass.png`, copiado de `asset-workbench/candidates/paths-and-roads/PNG_Tiled/Road5_grass.png`; SHA-256 `a8b0a41e508c3f8cdcdb3fa278adf0fbad9b9bb02009e5de3ddded7ace5f55f3`, 240×416 px. Su licencia local apunta a `https://craftpix.net/file-licenses/`.

`Roads.tmx` declara mapa ortogonal con tiles 16×16, `Ground_grass` (17 columnas, 527 tiles) y `Road5_grass` (15 columnas, 390 tiles). Es un mapa infinito de muestras con capas `ground2`, `ground1`, `grass` y `Roads`; no contiene objetos, spawn ni propiedades de colisión. La escena no carga ese TMX como nivel: compone su propio mapa finito de 80×60 tiles (1280×960 px), usa el tile 36 de `Ground_grass` como base y un parche de IDs `Road5_grass` leídos de un chunk de la capa `Roads`. No mezcla packs. Suelo y camino son transitables; solo se aplican los límites del mundo. El arte de terceros permanece en `public/assets/prototypes/`, excluido por `.gitignore`.

### Personaje Base 4-Direction: Unarmed

ZIP original conservado en `asset-workbench/incoming/craftpix-net-555940-free-base-4-direction-male-character-pixel-art.zip`, SHA-256 `c6c45db00c7a1a623e3721174db968409488963bb2ba239f05a4abfb9f7db3aa`. El ZIP tiene 546 entradas y pasa CRC. Se eligió la variante `Unarmed` para la prueba sin combate; se integran solo dos exportaciones PNG `Without_shadow`.

| Animación/dirección | Fila PNG | Frames | Duración ASE | Ciclo |
|---|---:|---:|---|---:|
| Idle front/down | 0 | 12 | 300,100,100,100,300,100,300,100,100,100,300,100 ms | 2000 ms |
| Idle side_left | 1 | 12 | 300,100,100,100,300,100,300,100,100,100,300,100 ms | 2000 ms |
| Idle side_right | 2 | 12 | 300,100,100,100,300,100,300,100,100,100,300,100 ms | 2000 ms |
| Idle back/up | 3 | 4 | 900,100,900,100 ms | 2000 ms |
| Walk front/down, side_left, side_right, back/up | 0,1,2,3 | 6 por dirección | 100 ms cada frame | 600 ms |

Los ocho `.aseprite` seleccionados son `ASEPRITE/Unarmed_Idle/Unarmed_Idle_{front,back,side_left,side_right}.aseprite` y `ASEPRITE/Unarmed_Walk/Unarmed_Walk_{front,back,side_left,side_right}.aseprite`; especifican canvas 64×64, RGBA 32-bit y un archivo por dirección/estado. `Tiled_files/Base_boy.tmx` declara las hojas con celdas 16×16 y 4×4 tiles por frame, pero lista 150 ms uniformes; el runtime usa los tiempos por cuadro de Aseprite, que incluyen holds de 300 y 900 ms. No hay Aseprite/LibreSprite CLI instalado. Phaser recibe las hojas PNG, no los archivos Aseprite. Para verificar filas se descomprimieron y compusieron temporalmente las capas ASE excluyendo `shadow`, y se compararon píxel a píxel contra cada celda PNG; las 12/4 celdas idle y las 6 walk por fila coincidieron.

En todas las celdas con personaje el alpha bbox mide aprox. 13–14×22–24 px en el frame 64×64 y su último píxel opaco está en y=43. Se usa escala nativa 1×: la silueta queda casi del ancho de un tile y ~1.5 tiles de alto; a 0.5× quedaría ~7×11 px. `UnarmedPlayerView` coloca el origen en `(0.5, 43/64)` para apoyar los pies en el cuerpo. La hitbox Arcade 14×10 y su posición/cálculo quedan sin cambios; siguen siendo valores provisionales, no una medición de colisión final.

El ZIP contiene `License.txt` con el enlace `https://craftpix.net/file-licenses/`; los términos Freebie consultados permiten incluir los recursos en juegos y prohíben redistribuir fuentes reutilizables. El ZIP no prueba por sí solo la adquisición. Las copias PNG y el manifest quedan en las rutas locales excluidas por `.gitignore`; el ZIP y los Aseprite permanecen en `incoming/`.

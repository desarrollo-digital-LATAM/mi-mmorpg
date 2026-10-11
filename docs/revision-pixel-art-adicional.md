# Revisión de los packs de pixel art adicionales

Revisión hecha sobre los nueve ZIP recibidos. Se inspeccionaron las imágenes, sus dimensiones y los `.tmx` incluidos. El Swordsman nivel 1 trae PNG de animación RGBA; por ejemplo, Idle mide 768×256, Walk 384×256, Attack 512×256, Hurt 320×256 y Death 448×256. Esos tamaños no definen por sí solos el tamaño del frame. Los packs contienen `License.txt`/`license.txt` con el enlace de licencia de CraftPix; eso identifica la licencia, pero no convierte los ZIP en recursos para redistribuir públicamente.

## Selección recomendada

| Pack | Sirve para | Decisión ahora | Límites / trabajo pendiente |
|---|---|---|---|
| **Swordsman 1–3 Level** | Protagonista de prueba. `Swordsman_lvl1` incluye idle, walk, run, ataque, daño y muerte; las versiones 2 y 3 permiten evolución visual más adelante. | **Candidato principal para Fase 1.** Se preparó el nivel 1, sin sombra y su referencia Tiled en `asset-workbench/candidates/swordsman-level-1/`. | No es “4 frames por fila” hasta demostrarlo: el TMX usa celdas de 16×16 y anima por IDs. Hay que derivar los frames/orientaciones desde la metadata y comprobar visualmente pies, anclaje y tamaño. El mapa TMX es una muestra de estados, no el mundo. |
| **Slime Mobs** | Primer enemigo. `Slime1` (Aqua) tiene idle, walk, run, hurt y death; CraftPix anuncia tres tipos de ataque. Otros dos colores/variantes pueden reservarse para progresión. | **Candidato principal para Fase 2**, no cargarlo en la escena todavía. Se preparó Aqua en `asset-workbench/candidates/aqua-slime/`. | El TMX usa tiles de 16×16 y describe animaciones por IDs. Confirmar dónde se segmentan los tres ataques; no asumir tres tiras PNG. Revisar compatibilidad visual con el héroe antes del combate. |
| **Path and Road** | Caminos y suelo con variantes de hierba, tierra y piedra; tilebase 16×16 y varias hojas de 240×416/480 o 272×496. | **Candidato para el suelo/caminos**; contenido preparado en `asset-workbench/candidates/paths-and-roads/`. | No incluye un conjunto completo de árboles, edificios y vegetación para un bosque. `Roads.tmx` es un ejemplo grande de capas de terreno/caminos (116×116), sin objetos ni colisiones de gameplay. Hace falta crear el mapa propio y conseguir piezas de entorno. |
| **Chapel** | Exterior con capilla, calle/muros, césped, flores, vallas y lápidas; interior religioso; personajes/NPC de cuatro direcciones, como Priest y Monks. | **Candidato para una plaza o zona de capilla más adelante.** Se conserva la carpeta `Tiled_files/` en `asset-workbench/candidates/chapel-outdoor-and-characters/`. | No equivale a un bosque ni a una aldea completa. `Exterior.tmx`, `Interior.tmx` y `Characters.tmx` son ejemplos de hojas/animaciones de 16×16, no niveles listos. Probar en una escena antes de mezclar con Road/Swordsman; son packs separados. |

## Útiles después, sin integrarlos ahora

| Pack | Uso correcto | Por qué esperar |
|---|---|---|
| **Dungeon** | Dungeons, trampas, agua, antorchas, cofres y paredes. | Buen candidato para una fase de interiores; TMX de muestra 16×16, no mundo con colisiones. La licencia acompaña al pack, pero registrar atribución y fuente en el inventario sigue siendo necesario. |
| **Vampire 4 Direction** | Personaje alternativo o familia de enemigos; contiene idle, caminar, correr, ataque, daño y muerte para tres variantes. | Duplica trabajo cubierto por Swordsman/Aqua Slime y su estética oscura puede desentonar con la primera zona. Guardar para una revisión visual posterior. |
| **Basic RPG UI** | Paneles, barras y pantallas de inventario/ajustes. | No implementa lógica de UI y no sabemos aún si encaja con el HUD. Elegir y probar un tema cuando exista gameplay. |
| **Keyboard and Mouse** | Ayuda visual de controles/tutorial. | No implementa entrada del jugador ni es arte de escenario. Uso puntual si se añade tutorial. |
| **Animated Magic Book** | Objeto/libro de interfaz, páginas y marcadores animados. | No es un efecto de hechizo ni reemplaza VFX de combate. Dejar para inventario, códice o misión. |

**No recomiendo borrar ni descartar ninguno**: “no usar ahora” significa que no resuelve el siguiente hito. Los ZIP originales siguen siendo la fuente para recuperar los packs opcionales.

## Lectura correcta de los TMX

- Los TMX de Swordsman y Slime describen atlas y ciclos de animación; las celdas indicadas son 16×16. CraftPix documenta cuatro vistas para el Swordsman. Hay que traducir y validar IDs, frames y orden antes de crear `Phaser.Animations`.
- Los TMX de Chapel, Dungeon, Keyboard y Book (muchos son 16×24 e `infinite=1`) son hojas de demostración de tilesets/animaciones, no mapas de juego.
- `Roads.tmx` tiene capas de muestra `ground2`, `ground1`, `grass` y `Roads`; no define spawn, sólidos, objetos, navegación ni mapa de campaña.
- Ninguno se debe cargar como mapa jugable sin revisar capas y referencias. El proyecto debe tener un mapa propio Tiled JSON con colisiones y spawn documentados.

## Archivos preparados

Las carpetas bajo `asset-workbench/candidates/` contienen PNG/TMX necesarios para probar los cuatro candidatos principales, el archivo de licencia del pack y hojas de contacto de referencia. No incluyen PSD/Aseprite ni las nueve descargas completas. Son material de trabajo local; no copiarlos a `public/` hasta terminar la selección y validar las animaciones. Conservar `License-source.txt` y registrar el origen si se integran.

## Licencias

Cada ZIP adjunto apunta a [la licencia de CraftPix](https://craftpix.net/file-licenses/). La licencia permite usar Freebies en proyectos/juegos bajo sus condiciones, pero restringe ofrecer o redistribuir los archivos fuente como un pack extraíble. Como el proyecto existe en GitHub y podría ser público, las imágenes y fuentes siguen excluidas de Git por defecto; un clon necesitará recuperarlas localmente. Comprueba la página de licencia al publicar o cambiar de uso.

## Siguiente decisión técnica

La ruta recomendada es probar primero **Swordsman nivel 1 + un mapa breve de plaza/camino**. Chapel aporta la composición de plaza; Road aporta caminos, pero no combinar sus hojas hasta inspeccionar ambos dentro de Phaser y confirmar escala/paleta. Si la escena debe ser estrictamente bosque, falta todavía un tileset con árboles y vegetación coherentes. El slime se integra cuando la escena del jugador y su estructura de animación estén verificadas.

## Revisión posterior: Base 4-Direction

Se recibió después el ZIP `craftpix-net-555940-free-base-4-direction-male-character-pixel-art.zip`. Para la prueba se eligió su variante Unarmed Idle/Walk: las fuentes Aseprite nombran las cuatro orientaciones y sus duraciones; la composición sin shadow coincide píxel a píxel con las cuatro filas de las exportaciones PNG. Está integrada solo como vista animada provisional y no implica combate ni habilita las demás acciones del pack. Detalles, hashes y limitaciones: `docs/prototipos-fase-1.md` y `docs/licencias-y-origen.md`.

# Integración de assets

## Dos inventarios distintos

- docs/assets-manifest.json y assets-inventory.csv: todo lo revisado, con estado técnico, origen, dimensiones, transparencia real y hash. No cargar este archivo para precargar todo en el juego.
- public/assets/runtime-manifest.json: los 98 iconos transparentes seleccionados y los dos atlas. `atlasKey` + `frameName` identifican cada imagen. No contiene animaciones ni stats.

`mode: RGBA` no implica transparencia: varias capturas del mago y habilidades tienen alfa 255 en todos los pixels. `hasTransparency` usa el contenido del canal alfa. alphaBoundingBox es la caja de pixels no transparentes, **no una hitbox ni un anclaje aprobado**.

## Atlas listos para Phaser 3

| key de textura | PNG | JSON | Frames |
|---|---|---|---|
| loot-icons | assets/atlases/loot-icons.png | assets/atlases/loot-icons.json | 48 |
| bestiary-icons | assets/atlases/bestiary-icons.png | assets/atlases/bestiary-icons.json | 50 |

Frames de 32×32 en atlas con celdas de 36×36 y 2px de margen transparente. Formato JSON hash, no spritesheet por filas. Los pixels de cada icono coinciden con el PNG original. Variantes `background` se conservan como PNG individuales, no se cargan por defecto.

Ejemplos de carga y visualización en integration-examples/. OpenCode puede adaptarlos; requieren Phaser y Vite instalados. Para incorporar los módulos, moverlos a src/game/assets/ y src/scenes/ ajustando imports.

```ts
this.load.atlas('loot-icons',
  `${import.meta.env.BASE_URL}assets/atlases/loot-icons.png`,
  `${import.meta.env.BASE_URL}assets/atlases/loot-icons.json`);
this.add.image(100, 100, 'loot-icons', 'loot_cristales_morados_17_transparent');
```

No usar `generateFrameNumbers` para animar estos atlas. Cada frame es un objeto/criatura distinto. La criatura slime puede aparecer en bestiario; no sustituye un personaje enemigo caminando.

## Capturas, hojas y mapas

No copiar asset-workbench a public ni empaquetarlo con el juego. Los bloques del mago no son strips uniformes; conservan múltiples filas/fondo. Sus retratos tampoco tienen transparencia. El escenario fue recortado y sus bordes/tamaños no garantizan que se pueda ensamblar sin costuras.

El dungeon tiene hojas 64×128, 128×272 y 112×112, aparentemente sobre celda 16×16. Esto es inferencia visual, no metadata recibida. Tras confirmar fuente y permiso, crear un tileset Tiled con el grid real; no redimensionar a 32px si basta zoom 2×. Algunas decoraciones ocupan varias celdas. No hay .tsx/.tsj/.tmx/.tmj suministrados ni propiedades de colisión.

## Contrato del futuro mapa

Una vez recibido el tileset exterior: mapa ortogonal, exportación Tiled JSON con tileset embebido para la primera versión, rutas relativas que funcionen desde public/assets/maps/. Capas propuestas `ground`, `details`, `objects`, `above`; objetos `player_spawn` y zonas de colisión o propiedad de tile `collides=true`. Comprobar soporte real de la configuración en Phaser 3; no asumir que una imagen de mapa incluye física.

## Cambios posteriores

Si reemplazas assets, actualiza IDs/rutas/hash del manifest de auditoría y runtime, frames atlas, créditos y ejemplos. El comprobador protege el estado entregado; un cambio intencional necesita actualizar la referencia de hash después de revisarlo, no desactivar la comprobación.


## Prototipos de Fase 1

La Fase 0B conserva los 98 iconos estáticos. Para el diagnóstico/prueba de Fase 1 se copiaron localmente ocho PNG seleccionados a `public/assets/prototypes/`, con `manifest.json`, hashes y `LICENSE-source.txt`. `.gitignore` excluye toda esa carpeta: no se fuerza su inclusión en Git ni se carga nada desde `asset-workbench/`.

- Swordsman nivel 1: `Walk_without_shadow` e `Idle_without_shadow` se cargan como spritesheets 64x64 a escala 1x. TMX documenta 150 ms por paso; se verifican 6 frames walk y 12 idle por cada una de cuatro filas. El orden de direcciones no aparece nombrado en el TMX, por lo que las filas permanecen indexadas.
- Path and Road: `Ground_grass`, `Road5` y `Road5_grass` se muestran como muestras de tiles 16x16. `Roads.tmx` no se importa como mapa jugable; la escena compone un mapa propio con 80×60 celdas, solo `Ground_grass` frame 36 y un parche `Road5_grass` derivado de una región de la capa `Roads`.
- Base 4-Direction: se carga la exportación PNG `Unarmed_Idle_without_shadow` y `Unarmed_Walk_without_shadow`, 64×64 por frame. La vista de cuatro orientaciones consume el estado de `PlayerController`; los `.aseprite` se conservan solo en el ZIP local, no se sirven ni se cargan desde Phaser.
- Chapel: `Exterior.png` se muestra como muestra de tiles 16x16. `Exterior.tmx` no se importa como plaza ni mapa jugable.
- Aqua Slime sigue reservado para Fase 2, fuera del manifest y de la carga runtime.

Inventario, hashes, fuentes, frame size, tiempos y límites: `docs/prototipos-fase-1.md`. El héroe integrado es una vista provisional sobre el controlador existente. El mapa de Path and Road sigue sin obstáculos ni colisiones; spawn y límites son propios de la escena. Ver `WorldTestScene` y el inventario para límites de escala/anclaje.

## Auditoría de packs anunciados en octubre de 2026

El ZIP Base 4-Direction ahora está disponible en `asset-workbench/incoming/` y fue auditado. Se integraron solo sus exportaciones PNG unarmed idle/walk verificadas; el ZIP y los Aseprite siguen locales. Los ZIP Tiny Hero y Undead están presentes, pero no se auditaron ni integraron en esta tarea. Los PNG de runtime siguen bajo la carpeta excluida por Git y manifestados por hash.

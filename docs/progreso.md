# Progreso

## Completado

- Auditoría del kit inicial, 98 iconos originales para UI y dos atlas Phaser.
- Se preparó la base técnica Vite + TypeScript estricto + Phaser 3.90.0 con lockfile.
- BootScene carga el manifiesto y ambos atlas; valida 98 entradas y hace visibles los errores.
- Galería de diagnóstico con 48 iconos de Botín y 50 de Bestiario, paginación y aviso de que no es jugable.
- Canvas lógico 960×540, FIT/CENTER_BOTH, pixelArt, roundPixels y estilos responsive.
- Scripts reportados como verificados: `dev`, `typecheck`, `build`, `preview`, `assets:check`.
- OpenCode reportó: `assets:check`, `typecheck`, `build`, prueba en Chrome headless, rutas de assets, responsive y base `/hack-the-andes/` correctas.
- Auditoría de nueve packs CraftPix nuevos. Candidato de protagonista, enemigo, caminos y capilla registrados en `docs/revision-pixel-art-adicional.md`.
- Preparación local de PNG/TMX relevantes para los cuatro candidatos bajo `asset-workbench/candidates/`; PSD/Aseprite quedan fuera.
- Fase 1: diagnostico Phaser reproducible de Swordsman nivel 1. `Idle_without_shadow` (768x256) se segmenta en 12x4 frames de 64x64; `Walk_without_shadow` (384x256) en 6x4 frames de 64x64. El TMX registra 150 ms por paso, por lo que los ciclos son 1800 ms y 900 ms respectivamente. Se conservan cuatro filas por indice, sin asignarlas a direcciones no documentadas.
- Fase 1: diagnóstico de `Ground_grass`, `Road5` y `Exterior` de Chapel a escala fuente. No se combinan los packs ni se convierten sus TMX de muestra en un mapa.
- Ocho prototipos locales con manifest, hashes, dimensiones, fuente y referencia de licencia; `assets:check` los verifica. `public/assets/prototypes/` sigue ignorado por Git.
- Prueba transitable provisional con `WorldTestScene`, controles WASD/flechas, cuerpo Arcade limitado al mundo, cámara y mapa de prueba Path and Road. La vista activa del jugador es ahora `UnarmedPlayerView`; `AsteriskPlayerView` permanece como alternativa.

## Fase actual

**Fase 1: diagnóstico de arte completado y prueba funcional de movimiento sobre tiles con personaje animado provisional.** No es un mundo final ni combate.

## Prueba transitable provisional · 2026-10-10

- Se añadió `WorldTestScene`, separada y conmutables de `PrototypeReviewScene` (`P` para diagnóstico; `W` para volver). La escena de diagnóstico y sus muestras se conservan.
- El mundo de prueba mide ahora 1280×960 (80×60 celdas de 16 px). `Ground_grass` ID 36 cubre el suelo y un parche de `Road5_grass` usa IDs trazados a la capa `Roads` de `Roads.tmx`; se quitaron el color uniforme y la cuadrícula de debug. El borde y spawn identificable se mantienen. El jugador usa cuerpo Arcade dinámico de 14×10, velocidad independiente y límites; WASD/flechas normalizan diagonal y paran al soltar.
- `PlayerController` conserva input/posición/cuerpo/estado. `UnarmedPlayerView` muestra el personaje Base 4-Direction, cambia idle/walk y orientación por `PlayerMotion`, y conserva facing al detenerse. `AsteriskPlayerView` queda como alternativa local no activa.
- La cámara sigue el cuerpo y respeta los límites del mapa. El prototipo conserva canvas lógico 960×540, FIT/CENTER_BOTH, pixelArt y roundPixels. El mapa no define obstáculos ni colisiones de escenario; todo el terreno y camino son transitables. No hay combate ni enemigos; el héroe tiene idle/walk provisional.
- Base 4-Direction Unarmed Idle/Walk está integrado localmente. Se verificaron filas, secuencias y tiempos usando sus ocho fuentes Aseprite contra celdas PNG. El runtime usa PNG; no carga Aseprite.
- Tiny Hero y Undead siguen sin auditar/integrar. La hitbox de 14×10 no se ha recalibrado y sigue siendo provisional; el origen gráfico usa pies en y=43/64 a escala nativa 1×. El contenido visible medido es 12–14×22–24 px; a 0.5× se reduciría a 6–7×11–12 px.
- La vista es reemplazable: `UnarmedPlayerView` consume posición/motion del controlador; revisar hitbox del héroe antes de pasar a zona definitiva.
- Pack de tiles seleccionado: Path and Road, porque su TMX e imágenes ofrecen suelo verde y camino coherentes en la misma familia exterior; Chapel Exterior queda como candidato distinto para otra zona. No se mezclan. Se copiaron solo los PNG runtime elegidos bajo la ruta ya ignorada `public/assets/prototypes/` y el manifest local registra hashes/fuente/licencia.

## Auditoría previa de assets · 2026-10-10 (snapshot anterior a la llegada de Base 4-Direction)

- Se inspeccionó el estado real del repositorio antes de editar. `asset-workbench/incoming/` no existe en este checkout. Rutas esperadas ausentes: `asset-workbench/incoming/base-4-direction/`, `asset-workbench/incoming/tiny-heroes/` y `asset-workbench/incoming/undead-tileset/`.
- Por esa ausencia no fue posible inspeccionar fuentes Aseprite, `Base_boy.tmx`, PNG `Sword/Without_shadow`, animaciones Tiny Hero ni `Undead_land.tmx`; tampoco se puede informar lienzo, cantidad/duración de cuadros, filas/direcciones, referencias de imágenes/capas, render ni licencia de esos packs. No se descargaron sustitutos ni se declararon resultados no observados.
- No hay evidencia que confirme un protagonista top-down dirigido, su idle/walk por dirección, hitbox de pies o tiles de entorno de producción. La escena transitable provisional se implementa con asteriscos autorizados por el usuario, no con arte no verificado.
- Checks ejecutados antes de editar: `npm run assets:check`, `npm run typecheck` y `npm run build`; los tres pasaron. Build reportó el aviso de bundle principal superior a 500 kB.
- Pendiente: revisar packs adicionales si vuelven a estar disponibles; confirmar el arte/animaciones del héroe, y convertir el mapa de prueba en un mapa Tiled de juego con geometría/spawn/colisiones explícitos y validación visual. El TMX fuente es referencia de tiles, no mapa de gameplay. Tiny Hero y Undead no se integraron.

## Pendiente

- Obtener la etiqueta o confirmacion visual autorizada que vincule las filas 0-3 del Swordsman con frente, atras, izquierda y derecha. No se necesitan ni se implementaran ocho direcciones.
- Medir y aprobar anclaje de pies y hitbox a partir del sprite dirigido confirmado.
- Validar una composicion exterior coherente. Road y Chapel solo se revisaron por separado; faltan arboles/vegetacion para llamar al entorno bosque.
- Tras lo anterior, crear un Tiled JSON propio con spawn, suelo, detalles, limites y colisiones; `Roads.tmx` y `Exterior.tmx` siguen siendo muestras, no mapas de campaña.
- Integrar slime animado y combate después de verificar héroe/mundo.
- Decidir UI, controles/tutorial, efectos, música, contenido y objetivos de la primera misión.
- Resolver el almacenamiento de assets de CraftPix en el flujo GitHub sin publicar los PNG fuente por accidente.

## Próximo paso exacto

Base 4-Direction Unarmed ya está activo en la vista del jugador. Siguiente paso: validar/calibrar su hitbox y crear una zona Tiled definitiva con spawn y colisiones verificadas. Para Fase 2 aún faltan enemigo animado integrado y diseño de combate; Aqua Slime es solo candidato.

## Verificaciones

Checks finales: `npm run assets:check`, `npm run typecheck` y `npm run build` correctos. También se generó build con `MSYS_NO_PATHCONV=1 VITE_BASE_PATH=/hack-the-andes/ npm run build` y se sirvió con `vite preview --base /hack-the-andes/` en Chrome headless. Se probaron individualmente flechas y WASD en los cuatro ejes, dos teclas diagonales, soltar (dos capturas estacionarias idénticas), límite izquierdo (jugador/cámara estables al mantener input), cámara en movimiento, resize a 390×844 (canvas 366×219.375 sin deformar proporción), y navegación mundo↔diagnóstico bajo la subruta. El test CDP comprobó canvas 960×540. El movimiento sobre suelo vacío no equivale a validar colisiones con obstáculos ni un mapa Tiled.

Comprobación posterior del mapa con tiles: la build de subruta `/hack-the-andes/` cargó en Chrome las imágenes de `Ground_grass` y `Road5_grass` con HTTP 200 y mostró césped/camino. Se repitieron ocho teclas individualmente, diagonal, detención, límites/cámara, resize y cambio a diagnóstico/regreso sin errores JS ni solicitudes fallidas. No hay obstáculos.

Los checks de hashes/dimensiones validan las dos exportaciones Base 4-Direction; resultados visuales de la escena integrada a continuación.

Comprobación del héroe en Chrome bajo `/hack-the-andes/`: idle visual comprobado en down/left/right/up, walk con movimiento, diagonal, cámara/límite izquierdo, resize a 390×844 y navegación a `PrototypeReviewScene`/regreso. Las dos hojas PNG respondieron HTTP 200; no hubo errores JS ni fallos de red. Se tomaron capturas en el límite: entre ellas solo cambió el bbox del personaje animado (16×32 px en la captura CSS), no el fondo, lo que confirma cámara/mapa estables. `assets:check` verifica ambos PNG por hash/dimensiones. El mapping de filas se contrastó píxel a píxel con los cuadros compuestos ASE sin shadow.

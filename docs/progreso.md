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
- Cinco prototipos locales con manifest, hashes, dimensiones, fuente y referencia de licencia; `assets:check` ahora los verifica. `public/assets/prototypes/` sigue ignorado por Git.

## Fase actual

**Fase 1: diagnóstico de arte y animación completado; mundo jugable bloqueado por datos no verificados.** La aplicación no se presenta como una zona explorable.

## Pendiente

- Obtener la etiqueta o confirmacion visual autorizada que vincule las filas 0-3 del Swordsman con frente, atras, izquierda y derecha. No se necesitan ni se implementaran ocho direcciones.
- Medir y aprobar anclaje de pies y hitbox a partir del sprite dirigido confirmado.
- Validar una composicion exterior coherente. Road y Chapel solo se revisaron por separado; faltan arboles/vegetacion para llamar al entorno bosque.
- Tras lo anterior, crear un Tiled JSON propio con spawn, suelo, detalles, limites y colisiones; `Roads.tmx` y `Exterior.tmx` siguen siendo muestras, no mapas de campaña.
- Integrar slime animado y combate después de verificar héroe/mundo.
- Decidir UI, controles/tutorial, efectos, música, contenido y objetivos de la primera misión.
- Resolver el almacenamiento de assets de CraftPix en el flujo GitHub sin publicar los PNG fuente por accidente.

## Próximo paso exacto

Conseguir confirmacion del orden de filas del Swordsman y un tileset exterior con vegetacion compatible. Solo entonces crear el mapa propio y habilitar movimiento/fisica/camara de Fase 1. Para Fase 2 aún faltan enemigo animado integrado y diseño de combate; Aqua Slime es solo candidato.

## Verificaciones

Ejecutado en este checkout: `npm run assets:check` correcto (894 imágenes auditadas, 98 iconos runtime, 2 atlas y 5 prototipos); `npm run typecheck` correcto; `npm run build` correcto. Chrome headless confirmó canvas 960x540, animación visible de las cuatro filas indexadas, cambio a revisión de candidatos, canvas 366x219 dentro de un viewport de 390 px y ausencia de errores de runtime/red/consola. El build con `VITE_BASE_PATH=/hack-the-andes/` se sirvió con `vite preview --base /hack-the-andes/`: manifest y los cinco prototipos cargaron sin errores. No se probaron movimiento en cuatro direcciones, diagonal, idle dirigido, obstáculos, cámara ni mapa, porque no existen ni se deben simular sin el orden de direcciones, anclaje/hitbox y entorno aprobados.

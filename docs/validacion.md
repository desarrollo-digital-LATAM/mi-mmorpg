# Validación del kit

Revisión del 2026-10-10 UTC.

| Comprobación | Resultado |
|---|---|
| Decodificar todas las imágenes entregadas | 894 PNG revisados con Pillow; sin errores de decodificación. |
| Comparar iconos con ZIP fuente CraftPix | Los 196 PNG individuales coinciden por SHA-256 con archivos de sus ZIP originales. |
| Verificar rutas, dimensiones, hash e IDs | `node scripts/verify-assets.mjs` pasa: 894 imágenes, 98 iconos runtime, 2 atlas. |
| Verificar los atlas | 98 frames válidos; comparación RGBA pixel a pixel idéntica a su PNG fuente. |
| Trazabilidad | 908 filas: 906 archivos del ZIP original y dos referencias adjuntas. Hashes cotejados con fuente; destinos conservados existen. |
| Fuentes de edición | Tres PSD recuperados, incluidos el principal y bonus de monstruos; no se sirven en public. |
| Catálogo offline | 606 tarjetas visibles en el inventario del HTML (miniaturas reducidas omitidas); todas sus rutas locales existen. |
| Filtros del catálogo | Código JS ejecutado con DOM simulado: 196 variantes utilizables, 3 dungeon pendientes, 18 variantes de slime, búsqueda sin resultados. |

No se ejecutó la aplicación con Phaser porque esta entrega es el kit previo a instalarla. Los ejemplos TS se verificarán al integrarlos con el prompt de Fase 0B. Tampoco se verificó visualmente el layout del catálogo en navegador: el entorno no dispone de ejecutable Chromium local. Se comprobó su código y rutas, sin afirmar una prueba de navegador realizada.

Esto valida los archivos y sus relaciones técnicas. Las capturas mantienen sus defectos de origen; la validación no las convierte en gráficos fuente ni acredita permisos desconocidos.

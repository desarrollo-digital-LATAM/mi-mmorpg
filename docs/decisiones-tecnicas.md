# Decisiones técnicas

1. **Phaser 3.90.0 + TypeScript + Vite** para la etapa propuesta, en continuidad con el plan del proyecto. Phaser 4 es la línea actual en la web oficial; se fija 3.90.0 deliberadamente para usar una API coherente con los ejemplos de esta entrega. No se presenta Phaser 3 como la última versión global.
2. **Arcade Physics**, gravedad cero, cuando haya mundo jugable. Hitbox en la zona de pies del protagonista; sus dimensiones se medirán en el sprite real.
3. **Perspectiva**: tilemap ortogonal, dibujo top-down 3/4. No isométrico puro ni física de plataformas.
4. **Tamaño**: 32×32 es el tamaño de los iconos disponibles, no una obligación para todo el mundo. El dungeon sugiere 16×16; confirmar con la fuente. Elegir tamaño del mapa a partir del tileset exterior seleccionado y escala visual del héroe. No mezclar 16/32 estirando capturas.
5. **Carga**: atlas JSON hash Phaser 3 para los iconos transparentes. Dos texturas contienen 98 frames estáticos, sin implicar animación. Variantes con fondo solo si la UI las necesita. No precargar todos los recortes.
6. **Rutas**: public/assets se sirve desde la raíz/base Vite. Usar BASE_URL para subrutas. docs contiene el inventario de revisión; runtime-manifest.json contiene solo los 98 iconos seleccionados.
7. **Profundidad**: ordenar sprites/objetos según pies (`y`) en fase mundo. Copas/techos y cuerpos físicos deben tener responsabilidades separadas; no colisionar con el rectángulo de toda la copa.
8. **Datos**: ID técnico separado del nombre mostrado y estadísticas. Los nombres visuales provisionales no asignan efectos de habilidades.
9. **Versiones**: Node/Vite/TypeScript se comprueban en la computadora del usuario; lockfile se genera durante fase base. No hay package.json ni lockfile fabricados en este kit.
10. **Persistencia**: LocalStorage versionado más adelante. Cuentas y multijugador necesitan diseño posterior; no asumir que una base de datos sincroniza un combate en tiempo real.

Fuentes oficiales consultadas el 2026-10-10 UTC: https://phaser.io/download/phaser3 ; https://phaser.io/download/stable ; https://docs.phaser.io/phaser/concepts/textures . Ver licencias-y-origen.md para fuentes de arte.

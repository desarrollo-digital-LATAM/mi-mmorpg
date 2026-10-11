# Hack the Andes

RPG 2D web individual con pixel art y perspectiva visual top-down 3/4. Fase 0B esta completada. Fase 1 conserva el diagnostico de Swordsman nivel 1 y Road/Chapel, y la prueba transitable ahora usa tiles de Path and Road y el personaje unarmed de Base 4-Direction. Es un prototipo local, no el mapa ni el arte final; no hay combate.

## Requisitos

- Node.js `24.19.0` (se verifico en esta base; Vite 8 requiere Node `^20.19.0 || >=22.12.0`).
- npm `11.17.0` o compatible.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

Comprobaciones disponibles:

```bash
npm run assets:check
npm run typecheck
npm run build
npm run preview
```

Para comprobar un despliegue en subruta desde PowerShell, generar y servir el build asi:

```powershell
$env:VITE_BASE_PATH = '/hack-the-andes/'
npm run build
npm run preview -- --base /hack-the-andes/
```

La aplicacion abre la prueba transitable: WASD/flechas mueven al héroe unarmed de cuatro direcciones con diagonal normalizada, cámara con límites y mapa pequeño de Path and Road. Idle conserva la última dirección. `P` abre el diagnóstico de assets; allí `Espacio` revisa candidatos, `I` abre la galería previa de 48 iconos de Botín y 50 de Bestiario, y `W` vuelve a la prueba. El mapa no tiene obstáculos. Los PNG locales seleccionados y su manifest están en `public/assets/prototypes/`, excluidos por Git; el ZIP original permanece en `asset-workbench/incoming/`.

## Estado y documentacion

- [Contexto](docs/contexto.md)
- [Roadmap](docs/roadmap.md)
- [Decisiones tecnicas](docs/decisiones-tecnicas.md)
- [Integracion de assets](docs/integracion-assets.md)
- [Licencias y origen](docs/licencias-y-origen.md)
- [Inventario de prototipos Fase 1](docs/prototipos-fase-1.md)
- [Progreso verificable](docs/progreso.md)

La siguiente accion es validar la hitbox del héroe y diseñar colisiones/objetivos para una zona final. El mapa/spawn siguen siendo de prueba y no hay combate; Aqua Slime continúa reservado para Fase 2.

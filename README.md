# Hack the Andes

RPG 2D web individual con pixel art y perspectiva visual top-down 3/4. Fase 0B esta completada y Fase 1 incluye un diagnostico reproducible de Swordsman nivel 1 y los candidatos Road/Chapel. No es un mundo jugable: todavia no hay mapa, movimiento, combate ni enemigo.

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

La aplicacion abre el diagnostico de Fase 1: anima sin escala las cuatro filas indexadas de Idle y Walk, y permite revisar Road/Chapel con `Espacio`. `I` abre la galeria previa de 48 iconos de Botin y 50 de Bestiario. Los prototipos de CraftPix en `public/assets/prototypes/` son locales e ignorados por Git; las capturas y fuentes de trabajo no se empaquetan.

## Estado y documentacion

- [Contexto](docs/contexto.md)
- [Roadmap](docs/roadmap.md)
- [Decisiones tecnicas](docs/decisiones-tecnicas.md)
- [Integracion de assets](docs/integracion-assets.md)
- [Licencias y origen](docs/licencias-y-origen.md)
- [Inventario de prototipos Fase 1](docs/prototipos-fase-1.md)
- [Progreso verificable](docs/progreso.md)

La siguiente accion es confirmar el orden de las cuatro direcciones del Swordsman y validar un entorno exterior coherente, con vegetacion y piezas para un mapa propio. Aqua Slime sigue reservado para Fase 2; no hay combate implementado.

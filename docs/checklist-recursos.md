# Recursos que debes conseguir

## Mínimo para comenzar el mundo

| Recurso | Requisito | Evitar |
|---|---|---|
| Exterior | PNG fuente: suelo, camino, bordes/transiciones, árboles, rocas, decoración; grid/spacing/margin documentados | Captura de una tienda o de un mapa completo; forzar todos los recortes a 32×32 |
| Héroe | PNG transparente: idle + walk en arriba/abajo/izquierda/derecha; tamaño de celda constante o atlas documentado | Lámina con rótulos/fondo; personaje de un solo frame presentado como animado |
| Registro de fuente | Autor, pack, URL, archivo de licencia y restricciones; evidencia de adquisición cuando corresponda | Asumir que una captura permite usar o redistribuir sus gráficos |

Un solo héroe basta para Fase 1. Mago puede ser el primero si recuperas su pack original autorizado; no necesitas comprar exactamente ese pack si eliges otro compatible.

## Antes del combate

- Un enemigo fuente transparente, con idle, movimiento, ataque, hurt y death. Confirmar número de frames por acción y direcciones; no deducirlo del icono.
- Héroe con ataque/hurt/death; definir alcance y momento de daño con respecto al frame del golpe.
- VFX o proyectil apropiado si es mago; iconos estáticos no son efectos.

## Especificación para cada animación

Guardar: celda o atlas, lista ordenada de frames, dirección, fps propuesto, loop, anclaje constante y alineación de pies. Contar frames observando la exportación; documentar dirección de cada fila. No suponer siempre `down,left,right,up`.

Las animaciones deben compartir escala y anclaje para no saltar. Si se recorta transparencia, conservar offsets/origin en un atlas; no trim independiente sin metadata.

## Después

Guerrero y asesino, NPC/casas del pueblo, iconos licenciados de skills/estados/equipo/pociones, ventanas/botones UI coherentes y sonido. Una fuente tipográfica válida, si se quiere una fuente especial. Se puede usar una fuente de sistema al inicio.

## Hoja de recepción de un nuevo pack

Copiar este registro en docs/licencias-y-origen.md al incorporarlo:

```text
ID del pack:
Autor / titular:
URL oficial:
Archivo recibido y SHA-256:
Licencia incluida / URL y fecha:
Uso en juego / distribución de fuentes:
Dimensiones / grid / spacing / margin:
Acciones / direcciones / orden / frames:
Estado: referencia | pendiente | aprobado
Ruta runtime (solo tras aprobación):
```

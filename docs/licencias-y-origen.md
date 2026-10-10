# Licencias y origen

Revisión: 2026-10-10 UTC. Este registro identifica la evidencia presente y las condiciones publicadas, no demuestra que cada captura haya sido adquirida con licencia.

| ID | Evidencia local | Fuente | Estado |
|---|---|---|---|
| loot | ZIP CraftPix aportado; PNG cotejados por SHA-256; License.txt apunta a la licencia oficial | https://craftpix.net/freebies/free-rpg-loot-icons-pixel-art/ | Freebie identificado; iconos para uso dentro del juego. |
| monster | ZIP CraftPix aportado; PNG cotejados por SHA-256; 48 + 2 bonus | https://craftpix.net/freebies/free-low-level-monsters-pixel-icons-32x32/ | Freebie identificado; iconos estáticos. |
| mage | Título visible en lámina, sin PNG fuente por frame ni licencia aportada | https://craftpix.net/product/mage-4-6-level-pixel-top-down-sprite-characters/ | Producto candidato por título/aspecto. No se acredita propiedad/adquisición con la lámina. Página indica contenido Premium y exportaciones por frame. |
| skills/estados/armas | Capturas y recortes, sin términos ni exportaciones fuente | No identificado de forma concluyente | No aprobar automáticamente. |
| exterior/nieve | Capturas y recortes | No identificado | Referencia hasta recuperar fuente/licencia. |
| dungeon original | dungeon.zip contiene solo 3 PNG | No identificado | Licencia pendiente; no copiar a public/. |
| mundo/slime y mapas completos anteriores | Imágenes de referencia aportadas | No acreditado | Referencia visual. |
| Swordsman 1–3 Level | ZIP nuevo aportado; `License.txt` apunta al URL de Freebie | https://craftpix.net/freebies/free-swordsman-1-3-level-pixel-top-down-sprite-character-pack/ | Candidato local; fases y mapeo de frames pendientes. |
| Path and Road | ZIP nuevo aportado; `license.txt` apunta al URL de Freebie | https://craftpix.net/product/path-and-road-top-down-tileset-pixel-art/ | Candidato local; no es mapa jugable. |
| Chapel | ZIP nuevo aportado; `License.txt` apunta al URL de Freebie | https://craftpix.net/freebies/free-chapel-pixel-art-top-down-asset-pack/ | Candidato local; probar estilo/escala. |
| Aqua Slime Mobs | ZIP nuevo aportado; `License.txt` apunta al URL de Freebie | https://craftpix.net/freebies/free-slime-mobs-pixel-art-top-down-sprite-pack/ | Candidato local; reservar para combate. |
| Keyboard and Mouse, RPG UI, Magic Book, Vampire, Dungeon nuevos | ZIPs nuevos aportados; License apunta a CraftPix | https://craftpix.net/file-licenses/ | Uso futuro opcional; ver revisión de packs. No son integraciones actuales. |

## CraftPix Freebie

En la página oficial https://craftpix.net/file-licenses/ la sección 2 permite el uso en proyectos personales/comerciales, modificación e inclusión en juegos y distribución del juego. No exige atribución, aunque la aprecia. No es una licencia CC0.

La misma sección restringe reventa/redistribución del arte como archivos aprovechables por terceros. Incluirlo en la ejecución del juego y ofrecer un pack descargable son usos distintos. No publicar este kit como biblioteca de assets ni asumir que el permiso para publicar el juego permite exponer todas las fuentes en GitHub. Si necesitas un repo público con arte versionado, confirmar ese uso con el titular o elegir recursos cuya licencia lo permita expresamente.

Los PSD se conservan como fuente de edición local y no se sirven con Vite. Los packs nuevos preservan `License-source.txt` bajo `asset-workbench/candidates/`; también se conserva la licencia previa en `licenses/craftpix/License.txt`. Los textos de licencia identifican el URL, no una copia local de las condiciones completas. Consulta la licencia vigente antes de publicar o cambiar el uso.

## Separación del código

No agregar un LICENSE general que declare el arte propio o CC0. Si eliges MIT para tu código, excluir explícitamente los gráficos de terceros de esa declaración y conservar sus avisos/condiciones.

El kit recibido es una reorganización para tu trabajo. Los archivos desconocidos no se convirtieron en assets autorizados al recortarlos, cambiarles el nombre o añadir un canal alfa.

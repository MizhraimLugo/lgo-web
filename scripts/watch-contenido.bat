@echo off
REM ════════════════════════════════════════════════════════════════════
REM  Watcher del blog Grupo LGO — modo VISIBLE (ventana de consola)
REM
REM  Uso normal: doble click. Aparece una ventana mostrando logs en
REM  vivo. Cierra la ventana para detener el watcher.
REM
REM  Para arrancarlo OCULTO al iniciar Windows, usa el .vbs hermano:
REM    watch-contenido.vbs en shell:startup
REM ════════════════════════════════════════════════════════════════════

title LGO Blog Watcher
cd /d "C:\Users\edgar\LGO web"
echo Iniciando vigilancia de C:\Users\edgar\Contenido Grupo LGO ...
echo (Cierra esta ventana para detener)
echo.
python "scripts\watch-contenido.py"
echo.
echo Watcher detenido. Presiona una tecla para cerrar.
pause >nul

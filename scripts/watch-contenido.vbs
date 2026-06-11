' ════════════════════════════════════════════════════════════════════
'  watch-contenido.vbs — arranca el watcher SIN ventana de consola
'
'  Para que se inicie automáticamente al iniciar sesión en Windows:
'   1. Win+R → escribe: shell:startup → Enter
'   2. Pega un acceso directo a ESTE archivo en esa carpeta
'   3. La próxima vez que enciendas la PC, el watcher arrancará solo
'
'  Para verificar que está corriendo: abre el Administrador de Tareas
'  y busca un proceso "python.exe" o revisa el log en:
'    C:\Users\edgar\LGO web\logs\watcher.log
'
'  Para detenerlo: termina el proceso python.exe correspondiente.
' ════════════════════════════════════════════════════════════════════

Set WshShell = CreateObject("WScript.Shell")
' Tercer argumento 0 = ventana oculta. Cuarto argumento False = no esperar.
WshShell.Run "cmd /c python ""C:\Users\edgar\LGO web\scripts\watch-contenido.py""", 0, False
Set WshShell = Nothing

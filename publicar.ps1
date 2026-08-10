# publicar.ps1 - Publica el sitio en ecuclima.com
#
# Estampa la version y la fecha en el pie de cada pagina que tenga el marcador
# <!--SELLO-->...<!--/SELLO-->, y despues confirma y sube los cambios.
#
# El sello existe para saber, mirando el pie de la pagina, si lo que se ve es la
# version recien publicada o una copia guardada en el navegador. Sin el hay que
# averiguarlo cada vez.
#
# Uso:   .\publicar.ps1 -Mensaje "que se cambio"
#        .\publicar.ps1 -Mensaje "..." -SoloSellar    (estampa sin subir)

param(
  [Parameter(Mandatory=$true)][string]$Mensaje,
  [switch]$SoloSellar
)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo

# 1. Traer lo que haya en GitHub. Si alguien publico desde otro equipo, esto
#    evita trabajar sobre una version vieja.
if (-not $SoloSellar) {
  Write-Host "Trayendo cambios de GitHub..." -ForegroundColor Cyan
  git pull --ff-only
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "  ALTO: el repositorio local y GitHub divergieron." -ForegroundColor Red
    Write-Host "  Alguien publico algo que no tienes. Resuelvelo antes de subir," -ForegroundColor Red
    Write-Host "  o se perdera su trabajo o el tuyo." -ForegroundColor Red
    exit 1
  }
}

# 2. Estampar el sello. La version es el commit que va a quedar publicado, asi
#    que se calcula despues de confirmar; aqui se usa un marcador temporal y se
#    reescribe al final.
$fecha = Get-Date -Format "dd/MM/yyyy HH:mm"
$paginas = Get-ChildItem $repo -Filter *.html -File | Where-Object {
  (Get-Content $_.FullName -Raw -Encoding UTF8) -match "<!--SELLO-->"
}

if ($paginas.Count -eq 0) {
  Write-Host "Ninguna pagina tiene el marcador <!--SELLO-->. Nada que estampar." -ForegroundColor Yellow
} else {
  foreach ($p in $paginas) {
    $txt = [System.IO.File]::ReadAllText($p.FullName, [System.Text.Encoding]::UTF8)
    $txt = [regex]::Replace($txt, "<!--SELLO-->.*?<!--/SELLO-->", "<!--SELLO-->$fecha<!--/SELLO-->")
    [System.IO.File]::WriteAllText($p.FullName, $txt, (New-Object System.Text.UTF8Encoding($false)))
  }
  Write-Host ("Sello estampado en " + $paginas.Count + " pagina(s): " + $fecha) -ForegroundColor Green
}

if ($SoloSellar) { Write-Host "Solo se sello. No se subio nada." -ForegroundColor Yellow; exit 0 }

# 3. Confirmar y subir.
# Los archivos que empiezan por "_" son borradores y maquetas de trabajo: no se
# publican. Si se suben quedan accesibles en el sitio y Google puede indexarlos.
# Ademas de las paginas hay que subir las imagenes y los datos: si solo se suben
# los .html, las fotos nuevas quedan en el disco y el sitio las muestra rotas.
git add -A -- "*.html" "img" "docs" "*.js" "*.png" "*.jpg" "*.webp" "*.pdf" ":(exclude)_*.html"
$hayCambios = git diff --cached --quiet; $hayCambios = ($LASTEXITCODE -ne 0)
if (-not $hayCambios) {
  Write-Host "No hay cambios que publicar." -ForegroundColor Yellow
  exit 0
}

$tmp = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText($tmp, $Mensaje, (New-Object System.Text.UTF8Encoding($false)))
git commit -F $tmp
Remove-Item $tmp -Force

git push origin main
if ($LASTEXITCODE -ne 0) { Write-Host "El push fallo." -ForegroundColor Red; exit 1 }

$commit = (git rev-parse --short HEAD)
Write-Host ""
Write-Host "  Publicado: $commit  -  $fecha" -ForegroundColor Green
Write-Host ""
Write-Host "  GitHub Pages tarda 1 o 2 minutos en construir el sitio." -ForegroundColor Cyan
Write-Host "  Para comprobarlo sin que el navegador sirva una copia guardada:" -ForegroundColor Cyan
Write-Host "     https://ecuclima.com/partes.html?v=$commit" -ForegroundColor White
Write-Host ""
Write-Host "  La fecha del pie de pagina debe decir: $fecha" -ForegroundColor Cyan

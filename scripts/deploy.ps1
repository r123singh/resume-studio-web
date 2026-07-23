# Deploy Resume Studio marketing site to Vercel
# Requires: vercel login

$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

vercel --prod --yes

Write-Host "Update LinkedIn company website URL with the production domain printed above."

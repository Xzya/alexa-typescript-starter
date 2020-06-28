#Requires -PSEdition Core

$parentFolder = Get-Location | Split-Path -LeafBase

$destPath = "..\dist"
$sourcePath = "..\" 

if ($parentFolder -eq "script") {
    $destPath = ".\dist"
    $sourcePath = ".\"
}

try {
    Write-Output "Starting alexa build pipeline"
    
    Write-Output "running tests and coverage"

    npm run test:coverage

    if (!$?) {
        throw "error run tests"
    }

    Write-Output "running build"

    npm run build
    
    if (!$?) {
        throw "error run build"
    }

    if (!(Test-Path $destPath)) {
        throw "dist folder doesn't exits!"
    }

    Get-Content $sourcePath\package.json |
    ConvertFrom-Json |
    Select-Object -ExcludeProperty devDependencies, jest, moduleFileExtensions, scripts, testMatch, coverageDirectory |
    ConvertTo-Json |
    Out-File $destPath"\package.json"

    Write-Output "package.json copied"

    npm run test:coverage

    Write-Output "pipeline finalized"
}
catch {
    Write-Error $Error[0]
    break;
}
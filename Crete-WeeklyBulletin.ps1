param(
    [Parameter(Mandatory=$true)] 
    [String]$rtfFilename,

    [Parameter(Mandatory=$false)] 
    [String]$htmFilename
)

# Open in Word file and Save as Web Filtered
Write-Output "Source file: $rtfFilename"
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $True
$doc = $wordApp.Documents.Open($rtfFilename)

$htmFilename = [IO.Path]::Combine([IO.Path]::GetDirectoryName($rtfFilename), [IO.Path]::GetFileNameWithoutExtension($rtfFilename) + ".htm")
Write-Output "Target file: $htmFilename"
$saveFormat = 10 # [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatFilteredHTML
$doc.SaveAs($htmFilename, [ref]$saveFormat)
$doc.Close()
$wordApp.Quit()

# Copy to bulletins folder
$bulletinsFolder = "D:\Work\Sites\sfa-site\bulletins"
$htmDestinationFilename = [IO.Path]::Combine($bulletinsFolder, [IO.Path]::GetFileName($htmFilename))
Write-Output "Copying $htmFilename to $bulletinsFolder ..."
Copy-Item -Path $htmFilename -Destination $htmDestinationFilename

# Add new file tp source control. git add, commit & push
git add $htmDestinationFilename
git commit -m "Add weekly bulletin $([IO.Path]::GetFileNameWithoutExtension($rtfFilename))"

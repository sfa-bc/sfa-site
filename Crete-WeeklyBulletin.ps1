param(
    [Parameter(Mandatory=$false)] 
    [String]$rtfFilename,

    [Parameter(Mandatory=$false)] 
    [String]$htmFilename
)

# Open in Word file and Save as Web Filtered
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $True
$doc = $wordApp.Documents.Open("d:\sf bulletin 32b 2021.wps.rtf")

$saveFormat = [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatFilteredHTML
$doc.SaveAs("d:\sf bulletin 32b 2021.wps.htm", [ref]$saveFormat)
$doc.Close()
$wordApp.Quit()

# https://ss64.com/ps/syntax-word.html

#$filename = 'C:\work\Demo99.docx'
#$saveFormat = [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatDocumentDefault
#$mydoc.SaveAs([ref][system.object]$filename, [ref]$saveFormat)
#$mydoc.Close()
#$MSWord.Quit()

# Copy to bulletins folder

# Add new file tp source control. git add, commit & push

Write-Output "Source file: $rtfFilename"
Write-Output "Target file: $htmFilename"

Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\sokrat\.gemini\antigravity\brain\5749e42f-e13f-445a-94f4-94480a92ef45\media__1778752475235.jpg'
$tmp = 'C:\Users\sokrat\Desktop\Orvian\src\assets\orvian-logo-tmp.png'
$dst = 'C:\Users\sokrat\Desktop\Orvian\src\assets\orvian-logo.png'

# Load source JPEG
$bmp    = [System.Drawing.Bitmap]::new($src)
$result = [System.Drawing.Bitmap]::new($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g      = [System.Drawing.Graphics]::FromImage($result)
$g.DrawImage($bmp, 0, 0)
$g.Dispose()
$bmp.Dispose()

# Per-pixel background removal:
#   brightness < 90  -> fully transparent
#   brightness 90-200 -> feathered alpha (smooth anti-alias edge)
#   brightness >= 200 -> fully opaque (logo pixels)
for ($y = 0; $y -lt $result.Height; $y++) {
    for ($x = 0; $x -lt $result.Width; $x++) {
        $px         = $result.GetPixel($x, $y)
        $brightness = [int]$px.R + [int]$px.G + [int]$px.B

        if ($brightness -lt 90) {
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $px.R, $px.G, $px.B))
        } elseif ($brightness -lt 200) {
            $alpha = [int](($brightness - 90) / 110.0 * 255)
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $px.R, $px.G, $px.B))
        }
        # else: keep pixel fully opaque
    }
}

# Save to temp first (avoids GDI+ file-lock on dst)
$result.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
$result.Dispose()

# Atomically replace destination
if (Test-Path $dst) { Remove-Item $dst -Force }
Move-Item $tmp $dst

Write-Host "Done - transparent PNG written to: $dst"

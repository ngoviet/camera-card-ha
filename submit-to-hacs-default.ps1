# Script hỗ trợ submit repository vào HACS default
# Repository: ngoviet/camera-card-ha

Write-Host "=== HACS DEFAULT SUBMISSION HELPER ===" -ForegroundColor Cyan
Write-Host ""

# Thông tin repository
$repository = "ngoviet/camera-card-ha"
$hacsDefaultRepo = "hacs/default"
$entry = "`"$repository`","

Write-Host "Repository: $repository" -ForegroundColor Green
Write-Host "Entry format: $entry" -ForegroundColor Green
Write-Host ""

# Kiểm tra GitHub CLI
Write-Host "1. Kiểm tra GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version
    Write-Host "   ✅ GitHub CLI đã cài đặt" -ForegroundColor Green
} catch {
    Write-Host "   ❌ GitHub CLI chưa cài đặt" -ForegroundColor Red
    Write-Host "   Cài đặt từ: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Kiểm tra authentication
Write-Host "`n2. Kiểm tra GitHub authentication..." -ForegroundColor Yellow
try {
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Đã đăng nhập GitHub" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Chưa đăng nhập GitHub" -ForegroundColor Red
        Write-Host "   Chạy: gh auth login" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "   ❌ Lỗi kiểm tra authentication" -ForegroundColor Red
    exit 1
}

# Hướng dẫn các bước
Write-Host "`n3. Hướng dẫn submit:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Bước 1: Fork repository hacs/default" -ForegroundColor Cyan
Write-Host "   - Truy cập: https://github.com/$hacsDefaultRepo" -ForegroundColor White
Write-Host "   - Click nút 'Fork' ở góc trên bên phải" -ForegroundColor White
Write-Host "   - Chọn account của bạn" -ForegroundColor White
Write-Host ""
Write-Host "   Bước 2: Clone fork của bạn" -ForegroundColor Cyan
Write-Host "   - Thay YOUR_USERNAME bằng username GitHub của bạn:" -ForegroundColor White
Write-Host "     git clone https://github.com/YOUR_USERNAME/default.git" -ForegroundColor Gray
Write-Host "     cd default" -ForegroundColor Gray
Write-Host ""
Write-Host "   Bước 3: Tạo branch mới" -ForegroundColor Cyan
Write-Host "     git checkout -b add-ngoviet-camera-card-ha" -ForegroundColor Gray
Write-Host ""
Write-Host "   Bước 4: Thêm entry vào file plugin" -ForegroundColor Cyan
Write-Host "   - Mở file 'plugin' trong editor" -ForegroundColor White
Write-Host "   - Tìm vị trí phù hợp (theo alphabet, sau các repo bắt đầu bằng 'n')" -ForegroundColor White
Write-Host "   - Thêm dòng: $entry" -ForegroundColor Green
Write-Host "   - Lưu file" -ForegroundColor White
Write-Host ""
Write-Host "   Bước 5: Commit và push" -ForegroundColor Cyan
Write-Host "     git add plugin" -ForegroundColor Gray
Write-Host "     git commit -m `"Add $repository to default repositories`"" -ForegroundColor Gray
Write-Host "     git push origin add-ngoviet-camera-card-ha" -ForegroundColor Gray
Write-Host ""
Write-Host "   Bước 6: Tạo Pull Request" -ForegroundColor Cyan
Write-Host "   - Truy cập: https://github.com/YOUR_USERNAME/default" -ForegroundColor White
Write-Host "   - Click 'Compare & pull request'" -ForegroundColor White
Write-Host "   - Điền thông tin PR (xem HACS_SUBMIT_GUIDE.md)" -ForegroundColor White
Write-Host "   - Click 'Create pull request'" -ForegroundColor White
Write-Host ""

# Tạo file template cho PR description
$prTemplate = @"
## Repository Information
- Repository: $repository
- Category: plugin (Frontend/Lovelace)
- Name: Advanced Camera Card
- Description: A comprehensive camera card for Home Assistant

## Requirements Met
- ✅ Public repository
- ✅ Issues enabled
- ✅ Topics added (hacs, home-assistant, lovelace, camera-card)
- ✅ Release v0.1.6 with assets (157 files)
- ✅ Valid hacs.json
- ✅ HACS validation passed

## Links
- Repository: https://github.com/$repository
- Release: https://github.com/$repository/releases/tag/v0.1.6
- hacs.json: https://github.com/$repository/blob/main/hacs.json
"@

$prTemplate | Out-File -FilePath "PR_DESCRIPTION_TEMPLATE.md" -Encoding UTF8
Write-Host "   ✅ Đã tạo file PR_DESCRIPTION_TEMPLATE.md" -ForegroundColor Green
Write-Host "   (Sử dụng nội dung này cho PR description)" -ForegroundColor Gray
Write-Host ""

Write-Host "=== HOÀN TẤT ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Xem chi tiết trong file HACS_SUBMIT_GUIDE.md" -ForegroundColor Yellow
Write-Host "📋 Sử dụng PR_DESCRIPTION_TEMPLATE.md cho PR description" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Sau khi PR được merge, repository sẽ có sẵn trong HACS!" -ForegroundColor Green


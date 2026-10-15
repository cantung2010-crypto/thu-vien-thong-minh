# Thư viện thông minh

Một demo trang web "Thư viện thông minh" — hiển thị danh mục sách, tìm kiếm, lọc theo thể loại, xem chi tiết và hỏi đáp nội bộ (không dùng AI).

Nội dung đã có trong repository:

- `index.html` — trang chính (HTML)
- `style.css` — CSS tùy chỉnh (nhỏ, phần lớn dùng Tailwind CDN)
- `script.js` — JavaScript tách riêng

Hướng dẫn chạy

1. Chạy trực tiếp (mở file):
   - Mở `index.html` bằng trình duyệt (dùng cho thử nghiệm nhanh). Một số trình duyệt chặn tải ảnh/asset khi mở file trực tiếp; nếu gặp lỗi, dùng server local.

2. Chạy bằng server local (đơn giản):
   - Nếu bạn có Python 3: trong thư mục repo chạy:
     ```bash
     python -m http.server 8000
     ```
     Mở http://localhost:8000

3. Triển khai trên GitHub Pages:
   - Vào trang repo trên GitHub -> Settings -> Pages
   - Chọn branch `main` và root `/` (hoặc folder `docs/` nếu bạn đặt ở đó)
   - Lưu và chờ vài phút để trang public sẵn sàng.

Lưu ý bảo mật & mở rộng

- Mã demo đã tránh dùng innerHTML trực tiếp cho dữ liệu người dùng để giảm nguy cơ XSS. Nếu bạn thay dữ liệu bằng API bên ngoài, hãy sanitize dữ liệu.
- Để tối ưu thực tế, cân nhắc build Tailwind vào một file CSS tĩnh thay vì dùng CDN.

Nếu bạn muốn, mình có thể:
- Thêm form quản trị để thêm/sửa sách (local JSON)
- Kết nối backend nhỏ để lưu/ghi sách
- Thiết lập GitHub Actions để deploy tự động lên GitHub Pages


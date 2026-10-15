#!/usr/bin/env python3
"""
THƯ VIỆN THÔNG MINH — Máy Chủ Python Đơn Giản Nhất (100% Giống Web Gốc)
Dự án khoa học kĩ thuật của Cấn Việt Tùng và Tạ Ngọc Diệp 11A1
"""

import http.server
import socketserver
import os

# Cổng khởi chạy máy chủ (8000 hoặc theo cổng dịch vụ đám mây)
PORT = int(os.environ.get("PORT", 8000))

# Toàn bộ mã giao diện Web HTML5 + Tailwind CSS giống hệt 100% web gốc
HTML_WEB = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THƯ VIỆN THÔNG MINH — Khám phá Sách Thông minh</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/html5-qrcode"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #ffffff; }</style>
</head>
<body class="bg-white text-gray-900 min-h-screen flex flex-col antialiased">

  <!-- 1. Thanh điều hướng Top Navbar -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-sm shadow-xs">
          📚
        </div>
        <div>
          <span class="font-bold text-sm sm:text-base text-gray-950 tracking-tight block">
            THƯ VIỆN THÔNG MINH
          </span>
          <span class="text-[10px] text-gray-500 font-medium hidden sm:block">
            Dự án KHKT của Cấn Việt Tùng và Tạ Ngọc Diệp 11A1
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="openBookModal('book-hoang-tu-be')" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-purple-50 text-gray-800 border border-orange-200 hover:border-orange-300">
          <span class="text-orange-500">✨</span>
          <span>Gợi ý sách</span>
        </button>
        <button onclick="openScanner()" class="px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
          <span>📷 Quét mã</span>
        </button>
      </div>
    </div>
  </header>

  <!-- 2. Hero Banner & Kệ Sách -->
  <main class="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 w-full">
    <div class="rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 text-white p-6 sm:p-10 shadow-xl border border-gray-800">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
        DỰ ÁN KHOA HỌC KỸ THUẬT 11A1 • CẤN VIỆT TÙNG & TẠ NGỌC DIỆP
      </div>
      <h2 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
        Khám phá Sách thông minh
      </h2>
      <p class="text-xs sm:text-sm text-gray-300 max-w-xl mb-4">
        Hệ thống tra cứu, quét mã vạch ISBN quang học, khám phá tác phẩm và các bài học đúc kết cho học sinh thư viện trường học.
      </p>
      <div class="flex flex-col sm:flex-row gap-2 max-w-xl">
        <input id="searchInput" type="text" placeholder="Tìm tên sách, tác giả hoặc mã ISBN..." 
          class="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          oninput="renderBooks()" />
        <button onclick="renderBooks()" class="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md">
          Tra cứu
        </button>
      </div>
    </div>

    <!-- Thanh lọc phân loại thể loại -->
    <div class="flex items-center gap-1.5 overflow-x-auto py-1">
      <button onclick="setCategory('all')" id="btn-all" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white shrink-0">Tất cả sách</button>
      <button onclick="setCategory('Văn học')" id="btn-vanhoc" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 shrink-0">Văn học</button>
      <button onclick="setCategory('Khoa học')" id="btn-khoahoc" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 shrink-0">Khoa học</button>
      <button onclick="setCategory('Công nghệ')" id="btn-congnghe" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 shrink-0">Công nghệ</button>
    </div>

    <div id="booksGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"></div>
  </main>

  <!-- 3. Modal Chi Tiết Tác Phẩm (Đã loại bỏ Góc câu hỏi tư duy AI) -->
  <div id="bookModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
      <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <span id="modalCategory" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700"></span>
        <button onclick="closeBookModal()" class="w-7 h-7 rounded-full bg-gray-200 font-bold text-xs">✕</button>
      </div>
      <div class="p-6 overflow-y-auto space-y-4 text-left text-xs text-gray-700">
        <div class="flex flex-col sm:flex-row gap-4 items-start">
          <img id="modalCover" class="w-32 aspect-[3/4] object-cover rounded-xl border shadow-sm mx-auto sm:mx-0 shrink-0" src="" />
          <div class="space-y-1.5 flex-1">
            <h3 id="modalTitle" class="text-lg font-black text-gray-900"></h3>
            <p id="modalAuthor" class="font-semibold text-gray-600"></p>
            <p id="modalIsbn" class="font-mono text-gray-400"></p>
            <div class="p-3 bg-orange-50 rounded-xl border border-orange-100 mt-2">
              <span class="font-bold text-orange-900 block mb-0.5">Thông điệp cốt lõi:</span>
              <p id="modalMessage" class="italic text-gray-800"></p>
            </div>
          </div>
        </div>
        <div class="border-t pt-3 space-y-1">
          <h4 class="font-bold text-gray-900 text-sm">Tóm tắt tác phẩm:</h4>
          <p id="modalSummary" class="text-gray-600 leading-relaxed"></p>
        </div>
        <div class="border-t pt-3 space-y-1">
          <h4 class="font-bold text-gray-900 text-sm">Bài học then chốt:</h4>
          <div id="modalTakeaways" class="space-y-1"></div>
        </div>
        <!-- Khung tra cứu nội dung tác phẩm (KHÔNG DÙNG AI) -->
        <div class="border-t pt-3 space-y-2">
          <h4 class="font-bold text-gray-900 text-sm">Tra cứu nhanh nội dung:</h4>
          <div id="chatHistory" class="p-3 bg-gray-50 rounded-xl border max-h-32 overflow-y-auto space-y-2">
            <div class="p-2 bg-white rounded-lg border text-gray-600">Nhập 'tác giả', 'thông điệp' hoặc 'bài học' để tra cứu nhanh.</div>
          </div>
          <div class="flex gap-2">
            <input id="userQuestion" type="text" placeholder="Nhập câu hỏi..." class="flex-1 px-3 py-2 rounded-xl border text-xs" onkeydown="if(event.key==='Enter') sendLookup()" />
            <button onclick="sendLookup()" class="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold">Tra cứu</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const books = [
      {
        id: "book-kieu",
        title: "TRUYỆN KIỀU",
        author: "Nguyễn Du",
        isbn: "STK-006073",
        category: "Văn học",
        year: 2024,
        coverImage: "https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-1-truy_n-ki_u.jpg",
        summary: "Truyện Kiều gồm 3.254 câu thơ lục bát, kể về cuộc đời 15 năm lưu lạc chìm nổi của Thúy Kiều vì chữ hiếu mà hy sinh tình duyên.",
        message: "Đề cao giá trị nhân phẩm, khát vọng tự do yêu đương và tư tưởng 'Chữ Tâm kia mới bằng ba chữ Tài'.",
        takeaways: [
          "Lòng hiếu thảo cao cả và sự hy sinh vì gia đình.",
          "Nghệ thuật miêu tả tâm lý và cảnh ngụ tình bậc thầy.",
          "Chữ Tâm và lòng nhân ái làm gốc rễ giá trị con người."
        ]
      },
      {
        id: "book-de-men",
        title: "DẾ MÈN PHIÊU LƯU KÝ",
        author: "Tô Hoài",
        isbn: "9786042183246",
        category: "Văn học",
        year: 2023,
        coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_21128.jpg",
        summary: "Hành trình trưởng thành của Dế Mèn từ một chú dế kiêu căng đến người bạn dũng cảm chuộng hòa bình.",
        message: "Tình bạn chân thành, lòng dũng cảm, tinh thần chuộng hòa bình và sự khiêm tốn.",
        takeaways: [
          "Bài học thấm thía về thói kiêu ngạo.",
          "Tình bạn thủy chung giữa Dế Mèn và Dế Trũi."
        ]
      },
      {
        id: "book-hoang-tu-be",
        title: "HOÀNG TỬ BÉ",
        author: "Antoine de Saint-Exupéry",
        isbn: "9786042171922",
        category: "Văn học",
        year: 2023,
        coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_43176.jpg",
        summary: "Cuộc gặp gỡ kỳ diệu giữa viên phi công trên sa mạc và Hoàng Tử Bé đến từ tiểu tinh cầu B-612.",
        message: "Những điều cốt lõi nhất thì vô hình trong mắt trần; người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim.",
        takeaways: [
          "Người ta chỉ thấy rõ bằng trái tim.",
          "Trách nhiệm với những gì mình đã gắn bó."
        ]
      },
      {
        id: "book-cosmos",
        title: "COSMOS: VŨ TRỤ",
        author: "Carl Sagan",
        isbn: "9786047771233",
        category: "Khoa học",
        year: 2022,
        coverImage: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235227361.jpg",
        summary: "Khám phá 15 tỷ năm lịch sử vũ trụ và khoa học nhân loại qua ngòi bút của Carl Sagan.",
        message: "Trái Đất là ngôi nhà chung mong manh giữa vũ trụ bao la; chúng ta có trách nhiệm bảo vệ nó.",
        takeaways: [
          "Chúng ta đều là bụi sao kết tinh thành.",
          "Trách nhiệm bảo tồn Trái Đất."
        ]
      }
    ];

    let currentCat = 'all';
    let currentBook = null;

    function renderBooks() {
      const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
      const filtered = books.filter(b => {
        const matchC = currentCat === 'all' || b.category === currentCat;
        const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
        return matchC && matchQ;
      });

      document.getElementById('booksGrid').innerHTML = filtered.map(b => 
        '<div onclick="openBookModal(\\'' + b.id + '\\')" class="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all p-3 flex flex-col cursor-pointer text-left">' +
          '<img src="' + b.coverImage + '" class="w-full aspect-[3/4] object-cover rounded-xl mb-2" />' +
          '<span class="text-[10px] font-bold text-orange-600">' + b.category + '</span>' +
          '<h4 class="font-bold text-xs text-gray-900 truncate">' + b.title + '</h4>' +
          '<p class="text-[11px] text-gray-500 truncate mb-2">' + b.author + '</p>' +
          '<div class="mt-auto pt-2 border-t text-[11px] font-semibold text-orange-600 text-right">Chi tiết →</div>' +
        '</div>'
      ).join('');
    }

    function setCategory(c) {
      currentCat = c;
      renderBooks();
    }

    function openBookModal(id) {
      currentBook = books.find(b => b.id === id);
      if (!currentBook) return;
      document.getElementById('modalCategory').innerText = currentBook.category;
      document.getElementById('modalTitle').innerText = currentBook.title;
      document.getElementById('modalAuthor').innerText = currentBook.author;
      document.getElementById('modalIsbn').innerText = 'ISBN: ' + currentBook.isbn;
      document.getElementById('modalCover').src = currentBook.coverImage;
      document.getElementById('modalMessage').innerText = currentBook.message;
      document.getElementById('modalSummary').innerText = currentBook.summary;
      document.getElementById('modalTakeaways').innerHTML = currentBook.takeaways.map(t => '<p>• ' + t + '</p>').join('');
      document.getElementById('bookModal').classList.remove('hidden');
    }

    function closeBookModal() {
      document.getElementById('bookModal').classList.add('hidden');
    }

    function sendLookup() {
      const inp = document.getElementById('userQuestion');
      const q = inp.value.trim().toLowerCase();
      if (!q || !currentBook) return;
      let reply = 'Tóm tắt: ' + currentBook.summary;
      if (q.includes('tác giả')) reply = 'Tác giả: ' + currentBook.author;
      else if (q.includes('thông điệp')) reply = 'Thông điệp: ' + currentBook.message;
      else if (q.includes('bài học')) reply = currentBook.takeaways.join('\\n');
      document.getElementById('chatHistory').innerHTML += '<div class="p-2 bg-white rounded border">' + reply + '</div>';
      inp.value = '';
    }

    renderBooks();
  </script>
</body>
</html>
"""

# Bộ xử lý yêu cầu HTTP cực đơn giản bằng thư viện chuẩn của Python
class SimpleWebHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(HTML_WEB.encode("utf-8"))

if __name__ == "__main__":
    print(f"🚀 THƯ VIỆN THÔNG MINH Python Web đang chạy tại: http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), SimpleWebHandler) as server:
        server.serve_forever()

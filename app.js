/**
 * ========================================================
 * app.js — Toàn bộ Logic Điều Khiển Trang Web
 * ========================================================
 */

let selectedCategory = 'all';
let searchQuery = '';
let sortBy = 'popular';
let currentBook = null;
let currentActiveTab = 'overview';
let html5QrCode = null;

// Khởi chạy khi tài liệu HTML sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  renderCategoryPills();
  renderBooks();
});

// 1. THANH LỌC THỂ LOẠI (CATEGORY PILLS)
function renderCategoryPills() {
  const counts = {};
  booksData.forEach(b => {
    counts[b.category] = (counts[b.category] || 0) + 1;
  });

  const container = document.getElementById('categoryPills');
  if (!container) return;

  let html = `
    <button
      type="button"
      onclick="setCategory('all')"
      class="cat-pill px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer shrink-0 ${
        selectedCategory === 'all'
          ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
      }"
    >
      Tất cả (${booksData.length})
    </button>
  `;

  Object.keys(counts).forEach(cat => {
    const isAct = selectedCategory.toLowerCase() === cat.toLowerCase();
    html += `
      <button
        type="button"
        onclick="setCategory('${cat}')"
        class="cat-pill px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer shrink-0 ${
          isAct
            ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }"
      >
        ${cat} (${counts[cat]})
      </button>
    `;
  });

  container.innerHTML = html;
}

function setCategory(cat) {
  selectedCategory = cat;
  renderCategoryPills();
  renderBooks();
}

// 2. HIỂN THỊ KỆ SÁCH (BOOKCARD GIỐNG 100%)
function renderBooks() {
  let filtered = booksData.filter(b => {
    const matchCat = selectedCategory === 'all' || b.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  if (sortBy === 'popular') filtered.sort((a, b) => b.views - a.views);
  else if (sortBy === 'newest') filtered.sort((a, b) => b.year - a.year);
  else if (sortBy === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));

  const noticeBox = document.getElementById('searchNotice');
  const noticeText = document.getElementById('searchNoticeText');
  if (searchQuery.trim()) {
    noticeBox?.classList.remove('hidden');
    if (noticeText) noticeText.innerText = `Kết quả tìm kiếm cho: "${searchQuery}" (${filtered.length} cuốn)`;
  } else {
    noticeBox?.classList.add('hidden');
  }

  const grid = document.getElementById('booksGrid');
  const empty = document.getElementById('emptyState');

  if (filtered.length === 0) {
    if (grid) grid.innerHTML = '';
    empty?.classList.remove('hidden');
    return;
  }

  empty?.classList.add('hidden');
  if (grid) {
    grid.innerHTML = filtered.map(book => `
      <div
        onclick="openBookDetails('${book.id}')"
        class="bg-white border border-gray-200 rounded-xl p-3 sm:p-3.5 hover:border-amber-400 hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between cursor-pointer group select-none"
      >
        <div>
          <div class="aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-100 mb-2.5 sm:mb-3 border border-gray-100 relative shadow-2xs">
            <img src="${book.coverImage}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
            <span class="absolute bottom-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white">
              ${book.shelfLocation || 'Thư viện'}
            </span>
          </div>

          <div class="mb-1">
            <span class="text-[10px] sm:text-[11px] font-medium text-gray-600 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded inline-block truncate max-w-full">
              ${book.category}
            </span>
          </div>

          <h3 class="font-bold text-xs sm:text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-amber-950 mb-0.5 sm:mb-1">
            ${book.title}
          </h3>
          <p class="text-[11px] sm:text-xs text-gray-500 line-clamp-1 mb-1.5 sm:mb-2">
            ${book.author} • ${book.year}
          </p>

          <p class="text-[11px] sm:text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
            ${book.description}
          </p>
        </div>

        <div class="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span class="flex items-center gap-1 text-gray-400 text-[10px] sm:text-[11px]">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>${book.views}</span>
          </span>
          <span class="text-[10px] text-amber-700 font-semibold group-hover:underline">Chi tiết →</span>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 3. TÌM KIẾM & SẮP XẾP
function handleSearchChange() {
  const input = document.getElementById('searchInput');
  searchQuery = input ? input.value : '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (searchQuery) clearBtn?.classList.remove('hidden');
  else clearBtn?.classList.add('hidden');
  renderBooks();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  searchQuery = '';
  document.getElementById('clearSearchBtn')?.classList.add('hidden');
  renderBooks();
}

function handleSortChange() {
  const select = document.getElementById('sortSelect');
  if (select) sortBy = select.value;
  renderBooks();
}

function resetAllFilters() {
  clearSearch();
  setCategory('all');
}

// 4. XEM CHI TIẾT SÁCH (MODAL 5 TAB)
function openBookDetails(bookId) {
  currentBook = booksData.find(b => b.id === bookId || b.isbn === bookId);
  if (!currentBook) return;

  currentBook.views += 1;
  const badge = document.getElementById('modalCategoryBadge');
  const title = document.getElementById('modalBookTitle');
  if (badge) badge.innerText = currentBook.category;
  if (title) title.innerText = currentBook.title;

  switchTab('overview');
  initChatBox();

  document.getElementById('detailsModal')?.classList.remove('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeDetailsModal() {
  document.getElementById('detailsModal')?.classList.add('hidden');
  renderBooks();
}

function switchTab(tab) {
  currentActiveTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-gray-900', 'text-gray-900', 'font-bold');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  const activeBtn = document.getElementById('tabBtn-' + tab);
  if (activeBtn) {
    activeBtn.classList.add('border-gray-900', 'text-gray-900', 'font-bold');
    activeBtn.classList.remove('border-transparent', 'text-gray-500');
  }

  const container = document.getElementById('tabContentContainer');
  if (!container || !currentBook) return;
  const b = currentBook;

  if (tab === 'overview') {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-row gap-3.5 items-start bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
          <div class="relative w-24 sm:w-28 shrink-0 aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 shadow-xs bg-gray-100">
            <img src="${b.coverImage}" class="w-full h-full object-cover" />
          </div>
          <div class="space-y-1 flex-1 min-w-0 text-xs text-gray-700">
            <div class="flex items-center justify-between py-1 border-b border-gray-100">
              <span class="text-gray-500">Tác giả:</span>
              <span class="font-semibold text-gray-900">${b.author}</span>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-gray-100">
              <span class="text-gray-500">Thể loại:</span>
              <span class="font-medium text-gray-800">${b.category}</span>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-gray-100">
              <span class="text-gray-500">Năm xuất bản:</span>
              <span class="font-medium text-gray-800">${b.year}</span>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-gray-100">
              <span class="text-gray-500">Mã ISBN:</span>
              <span class="font-mono text-gray-800">${b.isbn}</span>
            </div>
            <div class="flex items-center justify-between py-1">
              <span class="text-gray-500">Vị trí kệ:</span>
              <span class="font-medium text-amber-700">${b.shelfLocation}</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 text-xs text-gray-700">
          <h4 class="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
            <i data-lucide="book-open" class="w-4 h-4 text-orange-600"></i>
            <span>Tóm tắt nội dung tác phẩm</span>
          </h4>
          <p class="leading-relaxed text-gray-600">${b.summary}</p>
        </div>

        <div class="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 space-y-1 text-xs text-amber-950">
          <h4 class="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-600"></i>
            <span>Thông điệp cốt lõi</span>
          </h4>
          <p class="italic leading-relaxed">"${b.message}"</p>
        </div>
      </div>
    `;
  } else if (tab === 'plot') {
    container.innerHTML = `
      <div class="bg-white p-4 rounded-xl border border-gray-200 space-y-4">
        <h4 class="font-bold text-sm text-gray-900 flex items-center gap-1.5">
          <i data-lucide="git-commit" class="w-4 h-4 text-indigo-600"></i>
          <span>Diễn biến cốt truyện chính</span>
        </h4>
        <div class="relative pl-4 border-l-2 border-indigo-200 space-y-3.5">
          ${b.plot.map(p => `
            <div class="relative">
              <span class="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white"></span>
              <h5 class="font-bold text-xs text-gray-900">${p.event}</h5>
              <p class="text-[11px] text-gray-600 mt-0.5">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (tab === 'author') {
    container.innerHTML = `
      <div class="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
        <h4 class="font-bold text-sm text-gray-900 flex items-center gap-1.5">
          <i data-lucide="pen-tool" class="w-4 h-4 text-emerald-600"></i>
          <span>Tiểu sử & Phong cách tác giả</span>
        </h4>
        <p class="text-xs text-gray-700 leading-relaxed">${b.authorBio}</p>
      </div>
    `;
  } else if (tab === 'characters') {
    container.innerHTML = `
      <div class="space-y-3">
        <h4 class="font-bold text-sm text-gray-900 flex items-center gap-1.5">
          <i data-lucide="users" class="w-4 h-4 text-sky-600"></i>
          <span>Tuyến nhân vật tiêu biểu (${b.characters.length})</span>
        </h4>
        <div class="grid gap-2.5">
          ${b.characters.map(c => `
            <div class="p-3 bg-white rounded-xl border border-gray-200 flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-gray-900">${c.name}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-medium">${c.role}</span>
              </div>
              <p class="text-[11px] text-gray-600">${c.trait}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (tab === 'message') {
    container.innerHTML = `
      <div class="bg-white p-4 rounded-xl border border-gray-200 space-y-3.5">
        <h4 class="font-bold text-sm text-gray-900 flex items-center gap-1.5">
          <i data-lucide="quote" class="w-4 h-4 text-amber-600"></i>
          <span>Bài học đúc kết sâu sắc</span>
        </h4>
        <div class="space-y-2">
          ${b.keyTakeaways.map((t, idx) => `
            <div class="p-2.5 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-2 text-xs">
              <span class="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">${idx+1}</span>
              <span class="text-gray-700 leading-relaxed">${t}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

// 5. TRA CỨU SÁCH NỘI BỘ (0% AI NGOÀI)
function initChatBox() {
  const box = document.getElementById('chatMessagesBox');
  if (!box || !currentBook) return;
  box.innerHTML = `
    <div class="p-3 bg-white rounded-xl border border-gray-200 text-gray-700 leading-relaxed space-y-1">
      <p>Xin chào! Mình đã nạp sẵn toàn bộ thông tin về tác phẩm <strong>"${currentBook.title}"</strong> của tác giả <strong>${currentBook.author}</strong>.</p>
      <p class="text-[11px] text-gray-500">Bạn có thể hỏi về cốt truyện, thông điệp, các bài học hoặc ý nghĩa của cuốn sách này.</p>
    </div>
  `;
}

function askPreset(prompt) {
  const input = document.getElementById('chatInput');
  if (input) input.value = prompt;
  handleSendChat();
}

function handleSendChat(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  const q = input ? input.value.trim() : '';
  if (!q || !currentBook) return;

  const box = document.getElementById('chatMessagesBox');
  if (box) {
    box.innerHTML += `
      <div class="p-2.5 bg-gray-900 text-white rounded-xl text-right ml-auto max-w-[85%] font-medium">
        ${q}
      </div>
    `;
  }
  if (input) input.value = '';

  const b = currentBook;
  const lower = q.toLowerCase();
  let answer = '';

  if (lower.includes('thông điệp') || lower.includes('ý nghĩa')) {
    answer = `Thông điệp cốt lõi của tác phẩm "${b.title}" là:\n"${b.message}"\n\nTác phẩm khuyên độc giả hướng tới những giá trị chân - thiện - mỹ trong đời sống.`;
  } else if (lower.includes('bài học') || lower.includes('đúc kết')) {
    answer = `Các bài học quan trọng nhất đúc kết từ "${b.title}":\n` + b.keyTakeaways.map((t, i) => `${i+1}. ${t}`).join('\n');
  } else if (lower.includes('tác giả') || lower.includes('ai viết')) {
    answer = `Tác phẩm được sáng tác bởi tác giả ${b.author} (${b.year}). ${b.authorBio}`;
  } else if (lower.includes('nhân vật')) {
    answer = `Tuyến nhân vật chính trong sách gồm:\n` + b.characters.map(c => `• ${c.name} (${c.role}): ${c.trait}`).join('\n');
  } else {
    answer = `Về cuốn sách "${b.title}" (${b.author}): ${b.summary}\n\nThông điệp: "${b.message}"`;
  }

  if (box) {
    box.innerHTML += `
      <div class="p-3 bg-white rounded-xl border border-gray-200 text-gray-800 space-y-1.5 leading-relaxed whitespace-pre-line">
        ${answer}
        <div class="text-[10px] text-gray-400 border-t pt-1 font-mono">
          Nguồn: Thư viện số • Tác phẩm ${b.title} • ISBN: ${b.isbn}
        </div>
      </div>
    `;
    box.scrollTop = box.scrollHeight;
  }
}

// 6. QUÉT MÃ VẠCH (BARCODE SCANNER)
function openScannerModal() {
  document.getElementById('scannerModal')?.classList.remove('hidden');
  setTimeout(() => {
    try {
      if (!html5QrCode && window.Html5Qrcode) {
        html5QrCode = new Html5Qrcode("barcodeReaderBox");
      }
      if (html5QrCode) {
        html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 180 } },
          (decodedText) => {
            html5QrCode.stop();
            closeScannerModal();
            lookupIsbn(decodedText);
          },
          () => {}
        );
      }
    } catch (err) {
      console.warn("Lỗi camera:", err);
    }
  }, 300);
}

function closeScannerModal() {
  document.getElementById('scannerModal')?.classList.add('hidden');
  if (html5QrCode) {
    try { html5QrCode.stop(); } catch(e){}
  }
}

function submitManualIsbn() {
  const input = document.getElementById('manualIsbnInput');
  const code = input ? input.value.trim() : '';
  if (!code) return;
  closeScannerModal();
  lookupIsbn(code);
}

function lookupIsbn(isbn) {
  const book = booksData.find(b => b.isbn === isbn || isbn.includes(b.isbn));
  if (book) {
    openBookDetails(book.id);
  } else {
    alert("Không tìm thấy sách với mã ISBN: " + isbn);
  }
}

// 7. GỢI Ý TÁC PHẨM THEO TÂM TRẠNG
function openPersonalityModal() {
  document.getElementById('personalityModal')?.classList.remove('hidden');
}
function closePersonalityModal() {
  document.getElementById('personalityModal')?.classList.add('hidden');
}
function pickMood(mood) {
  closePersonalityModal();
  let targetId = 'book-hoang-tu-be';
  if (mood === 'kham-pha') targetId = 'book-de-men';
  else if (mood === 'khoa-hoc') targetId = 'book-cosmos';
  else if (mood === 'truyen-cam-hung') targetId = 'book-ai-superpowers';
  else if (mood === 'suy-ngam') targetId = 'book-kieu';

  openBookDetails(targetId);
}

// 8. QUẢN TRỊ VIÊN (MẬT KHẨU PIN 101001 & THÊM/XÓA SÁCH)
function openAdminAuthModal() {
  const pinInput = document.getElementById('adminPinInput');
  if (pinInput) pinInput.value = '';
  document.getElementById('adminPinError')?.classList.add('hidden');
  document.getElementById('adminAuthModal')?.classList.remove('hidden');
  setTimeout(() => pinInput?.focus(), 100);
}

function closeAdminAuthModal() {
  document.getElementById('adminAuthModal')?.classList.add('hidden');
}

function verifyAdminPin() {
  const pinInput = document.getElementById('adminPinInput');
  const pin = pinInput ? pinInput.value.trim() : '';
  const err = document.getElementById('adminPinError');
  if (pin === '101001') {
    closeAdminAuthModal();
    openAdminDashboardModal();
  } else {
    if (err) {
      err.innerText = '❌ Mật khẩu không đúng! Vui lòng nhập lại.';
      err.classList.remove('hidden');
    }
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

function openAdminDashboardModal() {
  renderAdminBooksList();
  document.getElementById('adminDashboardModal')?.classList.remove('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeAdminDashboardModal() {
  document.getElementById('adminDashboardModal')?.classList.add('hidden');
}

function renderAdminBooksList() {
  const totalCount = document.getElementById('adminTotalBooksCount');
  if (totalCount) totalCount.innerText = booksData.length;
  const list = document.getElementById('adminBooksListTable');
  if (!list) return;

  list.innerHTML = booksData.map(b => `
    <div class="p-3 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${b.coverImage}" class="w-9 h-12 object-cover rounded-md border shrink-0" />
        <div class="min-w-0">
          <h5 class="font-bold text-xs text-gray-900 truncate">${b.title}</h5>
          <p class="text-[11px] text-gray-500 truncate">${b.author} • <span class="font-mono text-gray-400">${b.isbn}</span></p>
        </div>
      </div>
      <button
        onclick="handleAdminDeleteBook('${b.id}')"
        class="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors shrink-0 cursor-pointer"
      >
        Xóa
      </button>
    </div>
  `).join('');
}

function handleAdminAddNewBook() {
  const title = (document.getElementById('adminBookTitle')?.value || '').trim();
  const author = (document.getElementById('adminBookAuthor')?.value || '').trim();
  const isbn = (document.getElementById('adminBookIsbn')?.value || '').trim();
  const category = document.getElementById('adminBookCategory')?.value || 'Văn học';
  const year = parseInt(document.getElementById('adminBookYear')?.value) || 2024;
  const coverImage = (document.getElementById('adminBookCover')?.value || '').trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600';
  const summary = (document.getElementById('adminBookSummary')?.value || '').trim() || 'Tác phẩm mới được bổ sung vào thư viện.';
  const message = (document.getElementById('adminBookMessage')?.value || '').trim() || 'Khám phá tri thức và giá trị nhân văn cao đẹp.';

  if (!title || !author || !isbn) {
    alert('Vui lòng nhập đầy đủ: Tên tác phẩm, Tác giả và Mã ISBN!');
    return;
  }

  const newBook = {
    id: 'book-' + Date.now(),
    title: title,
    author: author,
    isbn: isbn,
    category: category,
    publisher: 'NXB Giáo Dục',
    year: year,
    pageCount: 200,
    shelfLocation: 'Kệ mới nhập',
    views: 0,
    coverImage: coverImage,
    description: summary,
    summary: summary,
    message: message,
    keyTakeaways: [summary, message],
    plot: [{ event: "Khởi đầu câu chuyện", desc: summary }],
    authorBio: `Tác giả ${author}, sáng tác tác phẩm ${title}.`,
    characters: [{ name: "Nhân vật chính", role: "Trung tâm", trait: "Tiêu biểu cho tư tưởng tác phẩm" }]
  };

  booksData.unshift(newBook);
  alert(`✓ Đã thêm thành công cuốn sách: "${title}" vào thư viện!`);

  // Xóa trắng form
  if (document.getElementById('adminBookTitle')) document.getElementById('adminBookTitle').value = '';
  if (document.getElementById('adminBookAuthor')) document.getElementById('adminBookAuthor').value = '';
  if (document.getElementById('adminBookIsbn')) document.getElementById('adminBookIsbn').value = '';
  if (document.getElementById('adminBookCover')) document.getElementById('adminBookCover').value = '';
  if (document.getElementById('adminBookSummary')) document.getElementById('adminBookSummary').value = '';
  if (document.getElementById('adminBookMessage')) document.getElementById('adminBookMessage').value = '';

  renderAdminBooksList();
  renderCategoryPills();
  renderBooks();
}

function handleAdminDeleteBook(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;
  if (confirm(`Bạn có chắc chắn muốn xóa cuốn sách "${book.title}" khỏi thư viện?`)) {
    booksData = booksData.filter(b => b.id !== bookId);
    renderAdminBooksList();
    renderCategoryPills();
    renderBooks();
  }
}

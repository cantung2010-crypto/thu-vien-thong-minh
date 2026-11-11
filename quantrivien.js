// Mở xác thực quản trị viên
function openAdminLogin() {
  const pin = prompt("Nhập mật khẩu quản trị viên (Mặc định: 101001):");
  if (pin === "101001") {
    document.getElementById("adminModal").classList.remove("hidden");
  } else if (pin !== null) {
    alert("❌ Mật khẩu không chính xác!");
  }
}

function closeAdminModal() {
  document.getElementById("adminModal").classList.add("hidden");
}

// Lưu sách mới vào danh mục
function saveNewBook() {
  const title = document.getElementById("newTitle").value.trim();
  const author = document.getElementById("newAuthor").value.trim();
  const isbn = document.getElementById("newIsbn").value.trim();
  const category = document.getElementById("newCategory").value;
  const coverImage = document.getElementById("newCover").value.trim() || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600";
  const summary = document.getElementById("newSummary").value.trim();

  if (!title || !author || !isbn) {
    alert("Vui lòng nhập đầy đủ Tên sách, Tác giả và Mã ISBN!");
    return;
  }

  // Thêm vào danh sách sách
  booksData.unshift({
    id: "book-" + Date.now(),
    title: title,
    author: author,
    isbn: isbn,
    category: category,
    coverImage: coverImage,
    description: summary,
    summary: summary,
    message: "Tác phẩm mới được thêm vào thư viện.",
    views: 0,
    year: 2024,
    shelfLocation: "Kệ mới",
    plot: [],
    characters: [],
    keyTakeaways: [summary]
  });

  alert(`✓ Đã thêm thành công cuốn sách: "${title}"!`);
  closeAdminModal();
  renderCategoryPills();
  renderBooks();
}

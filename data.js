/**
 * ========================================================
 * data.js — Cơ sở Dữ liệu Sách Thư viện Thông minh
 * ========================================================
 */

let booksData = [
  {
    id: "book-kieu",
    title: "TRUYỆN KIỀU",
    author: "Nguyễn Du",
    isbn: "STK-006073",
    category: "Văn học",
    publisher: "NXB Văn Học",
    year: 2024,
    pageCount: 186,
    shelfLocation: "Kệ A1 - Tủ Văn học Cổ điển",
    views: 342,
    coverImage: "https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-1-truy_n-ki_u.jpg",
    description: "Kiệt tác bất hủ của đại thi hào Nguyễn Du gồm 3.254 câu thơ lục bát, phản ánh sâu sắc số phận người phụ nữ tài hoa bạc mệnh và khát vọng nhân văn.",
    summary: "Truyện Kiều kể về cuộc đời 15 năm lưu lạc đầy đau khổ của Thúy Kiều - người con gái tài sắc vẹn toàn vì cứu cha mà phải bán mình chuộc tội, trải qua muôn vàn gian truân trước khi đoàn tụ gia đình.",
    message: "Đề cao giá trị nhân phẩm, quyền tự do yêu đương, lòng hiếu thảo và tư tưởng 'Chữ Tâm kia mới bằng ba chữ Tài' làm gốc rễ cuộc đời.",
    keyTakeaways: [
      "Khát vọng tự do yêu đương và tự quyết định hạnh phúc qua mối tình Kim - Kiều.",
      "Chữ Hiếu cao đẹp khi Kiều chấp nhận hy sinh duyên riêng vì gia đình.",
      "Nghệ thuật miêu tả tâm lý và ngôn ngữ thơ lục bát trác tuyệt của Nguyễn Du.",
      "Lấy chữ Tâm và lòng nhân ái làm nền tảng định hướng giá trị làm người."
    ],
    plot: [
      { event: "Du xuân Thanh minh", desc: "Thúy Kiều gặp gỡ Kim Trọng và hai bên thề nguyền gắn bó son sắt." },
      { event: "Gia biến tai ương", desc: "Gia đình gặp nạn, Kiều bán mình chuộc cha và trao lại mối duyên cho em gái Thúy Vân." },
      { event: "Mười lăm năm lưu lạc", desc: "Rơi vào tay Mã Giám Sinh, Tú Bà, Sở Khanh, Thúc Sinh, Hoạn Thư..." },
      { event: "Gặp gỡ Từ Hải", desc: "Từ Hải giúp Kiều báo ân báo oán, lấy lại công lý danh dự." },
      { event: "Đoàn tụ", desc: "Trở về hội ngộ cùng gia đình và Kim Trọng sau muôn trùng bão táp." }
    ],
    authorBio: "Đại thi hào dân tộc, Danh nhân văn hóa thế giới (1765 - 1820), quê tại Tiên Điền, Nghi Xuân, Hà Tĩnh. Bậc thầy của thể thơ lục bát tiếng Việt.",
    characters: [
      { name: "Thúy Kiều", role: "Nhân vật chính", trait: "Tài sắc vẹn toàn, hiếu nghĩa, giàu đức hy sinh" },
      { name: "Kim Trọng", role: "Người tình tri kỷ", trait: "Hào hoa phong nhã, thủy chung son sắt" },
      { name: "Thúy Vân", role: "Em gái Kiều", trait: "Đoan trang, phúc hậu, thay chị trọn nghĩa" },
      { name: "Từ Hải", role: "Anh hùng trượng nghĩa", trait: "Đầu đội trời chân đạp đất, trọng nghĩa khinh tài" }
    ]
  }

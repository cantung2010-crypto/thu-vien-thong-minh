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
  },
  {
    id: "book-de-men",
    title: "DẾ MÈN PHIÊU LƯU KÝ",
    author: "Tô Hoài",
    isbn: "9786042183246",
    category: "Văn học",
    publisher: "NXB Kim Đồng",
    year: 2023,
    pageCount: 195,
    shelfLocation: "Kệ B2 - Văn học Thiếu nhi",
    views: 428,
    coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_21128.jpg",
    description: "Tác phẩm văn học thiếu nhi kinh điển của Tô Hoài kể về bài học trưởng thành và lý tưởng hòa bình của chú Dế Mèn.",
    summary: "Từ một chàng dế kiêu căng gây ra cái chết của Dế Choắt, Dế Mèn thức tỉnh và cùng Dế Trũi dấn thân vào hành trình phiêu lưu khắp bốn phương, kết nghĩa anh em và kêu gọi muôn loài sống hòa bình.",
    message: "Tình bạn chân thành, lòng dũng cảm, tinh thần chuộng hòa bình và sự khiêm tốn.",
    keyTakeaways: [
      "Bài học thấm thía về thói kiêu ngạo dẫn đến hậu quả tai hại.",
      "Tình anh em kết nghĩa keo sơn gắn bó giữa Dế Mèn và Dế Trũi.",
      "Ý chí phiêu lưu khám phá thế giới rộng lớn, vượt khỏi lũy tre làng.",
      "Khát vọng muôn loài muôn vật kết làm anh em, hòa bình bác ái."
    ],
    plot: [
      { event: "Thời trẻ bồng bột", desc: "Dế Mèn kiêu căng trêu chị Cốc khiến Dế Choắt bị chết oan." },
      { event: "Lên đường phiêu lưu", desc: "Rời khỏi hang mẹ, dấn thân vào thế giới rộng lớn bên ngoài." },
      { event: "Kết nghĩa bạn hiền", desc: "Cứu Dế Trũi thoát nạn và kết làm anh em đồng chí hướng." },
      { event: "Đại hội muôn loài", desc: "Vận động muôn loài kết làm anh em, không tranh đoạt cấu xé." }
    ],
    authorBio: "Nhà văn Tô Hoài (1920 - 2014), cây đại thụ của văn học hiện đại Việt Nam, bậc thầy truyện đồng thoại thiếu nhi.",
    characters: [
      { name: "Dế Mèn", role: "Nhân vật chính", trait: "Dũng mãnh, ban đầu ngạo mạn sau biết sửa sai" },
      { name: "Dế Trũi", role: "Người bạn tri kỷ", trait: "Kiên cường, trung thực, bạn đồng hành tin cậy" },
      { name: "Dế Choắt", role: "Người hàng xóm", trait: "Gầy gò ốm yếu, để lại bài học đắt giá cho Mèn" }
    ]
  },
  {
    id: "book-hoang-tu-be",
    title: "HOÀNG TỬ BÉ",
    author: "Antoine de Saint-Exupéry",
    isbn: "9786042171922",
    category: "Văn học",
    publisher: "NXB Kim Đồng",
    year: 2023,
    pageCount: 110,
    shelfLocation: "Kệ C1 - Văn học Thế giới",
    views: 512,
    coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_43176.jpg",
    description: "Cuốn sách triết lý giản dị mà sâu sắc nhất thế giới về tình bạn, tình yêu và cách nhìn cuộc sống bằng trái tim.",
    summary: "Viên phi công gặp nạn trên sa mạc Sahara bất ngờ gặp gỡ Hoàng Tử Bé đến từ tiểu tinh cầu B-612. Qua câu chuyện của cậu về đóa hoa hồng, chú cáo và các hành tinh, người lớn nhận ra những giá trị đích thực đã vô tình lãng quên.",
    message: "Những điều cốt lõi nhất thì vô hình trong mắt trần; người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim.",
    keyTakeaways: [
      "Người ta chỉ thấy rõ với trái tim. Điều cốt lõi thì vô hình trong mắt trần.",
      "Bạn phải chịu trách nhiệm mãi mãi với những gì bạn đã thuần hóa.",
      "Thời gian bạn dành cho bông hoa hồng làm cho nàng trở nên quan trọng."
    ],
    plot: [
      { event: "Rơi xuống sa mạc", desc: "Máy bay gặp sự cố giữa sa mạc hoang vu." },
      { event: "Cuộc gặp kỳ diệu", desc: "Hoàng Tử Bé xuất hiện và nhờ vẽ một con cừu." },
      { event: "Bài học của con Cáo", desc: "Khái niệm thuần hóa và nhìn thấu bản chất bằng trái tim." }
    ],
    authorBio: "Nhà văn kiêm phi công người Pháp Antoine de Saint-Exupéry (1900 - 1944).",
    characters: [
      { name: "Hoàng Tử Bé", role: "Nhân vật chính", trait: "Ngây thơ, trong sáng, tràn đầy tình thương" },
      { name: "Con Cáo", role: "Người thầy triết lý", trait: "Uyên bác, trao cho cậu bài học về sự thuần hóa" }
    ]
  },
  {
    id: "book-cosmos",
    title: "COSMOS: VŨ TRỤ",
    author: "Carl Sagan",
    isbn: "9786047771233",
    category: "Khoa học",
    publisher: "NXB Thế Giới",
    year: 2022,
    pageCount: 420,
    shelfLocation: "Kệ K3 - Thiên văn học",
    views: 298,
    coverImage: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235227361.jpg",
    description: "Hành trình vĩ đại khám phá không gian, thời gian và sự sống qua ngòi bút của nhà thiên văn Carl Sagan.",
    summary: "Bức tranh tráng lệ về 15 tỷ năm tiến hóa của vũ trụ, hành trình con người khai phá khoa học và nhận thức vị thế khiêm nhường của loài người.",
    message: "Trái Đất là ngôi nhà chung mong manh giữa vũ trụ bao la; chúng ta có trách nhiệm trân trọng và bảo tồn nó.",
    keyTakeaways: [
      "Chúng ta đều là tro bụi của các vì sao kết tinh thành.",
      "Tư duy hoài nghi khoa học kết hợp lòng bao dung rộng mở.",
      "Trách nhiệm bảo vệ Hạt bụi xanh lơ duy nhất của sự sống."
    ],
    plot: [
      { event: "Khởi nguồn Vũ trụ", desc: "Vụ nổ Big Bang và sự hình thành các thiên hà." },
      { event: "Hạt bụi xanh lơ", desc: "Bức ảnh Trái Đất chụp từ rìa hệ Mặt Trời và bài học vị thế." }
    ],
    authorBio: "Carl Sagan (1934 - 1996), nhà thiên văn học người Mỹ có công phổ biến khoa học đến đại chúng.",
    characters: []
  },
  {
    id: "book-ai-superpowers",
    title: "AI SUPERPOWERS — CƯỜNG QUỐC TRÍ TUỆ NHÂN TẠO",
    author: "Kai-Fu Lee",
    isbn: "9786045892341",
    category: "Công nghệ",
    publisher: "NXB Trẻ",
    year: 2023,
    pageCount: 368,
    shelfLocation: "Kệ CN1 - Công nghệ",
    views: 380,
    coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_35933.jpg",
    description: "Phân tích sắc bén về làn sóng AI, tương lai việc làm và sức mạnh của lòng thấu cảm con người.",
    summary: "Tiến sĩ Kai-Fu Lee làm sáng tỏ cách AI định hình nền kinh tế và nhấn mạnh những phẩm chất máy móc không thể thay thế: tình yêu thương và sự đồng cảm.",
    message: "AI tối ưu hóa năng suất, nhưng trái tim và sự sẻ chia giữa con người mới đem lại ý nghĩa đích thực.",
    keyTakeaways: [
      "Bốn làn sóng bùng nổ của trí tuệ nhân tạo.",
      "Tác động sâu sắc của tự động hóa tới việc làm tương lai.",
      "Sức mạnh không thể thay thế của lòng trắc ẩn giữa con người."
    ],
    plot: [
      { event: "Làn sóng AI bùng nổ", desc: "Từ học sâu đến ứng dụng thực tiễn trong đời sống." },
      { event: "Bản thiết kế tương lai", desc: "Sự kết hợp giữa trí tuệ máy móc và trái tim nhân hậu." }
    ],
    authorBio: "Tiến sĩ Kai-Fu Lee, chuyên gia AI hàng đầu thế giới, cựu chủ tịch Google Trung Quốc.",
    characters: []
  }
];

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dữ liệu sách mẫu
books = [
    {
        "id": 1,
        "title": "Dế Mèn Phiêu Lưu Ký",
        "author": "Tô Hoài",
        "category": "Văn học",
        "year": 1941,
        "image": "https://placehold.co/200x280",
        "description": "Câu chuyện về cuộc phiêu lưu của Dế Mèn.",
        "summary": "Tác phẩm kể về hành trình trưởng thành của Dế Mèn.",
        "characters": "Dế Mèn, Dế Trũi",
        "barcode": "8931234567890"
    },
    {
        "id": 2,
        "title": "Lão Hạc",
        "author": "Nam Cao",
        "category": "Văn học",
        "year": 1943,
        "image": "https://placehold.co/200x280",
        "description": "Một truyện ngắn nổi tiếng của Nam Cao.",
        "summary": "Tác phẩm phản ánh số phận người nông dân nghèo.",
        "characters": "Lão Hạc, Ông giáo",
        "barcode": "8931234567891"
    },
    {
        "id": 3,
        "title": "Nhật Ký Trong Tù",
        "author": "Hồ Chí Minh",
        "category": "Lịch sử",
        "year": 1942,
        "image": "https://placehold.co/200x280",
        "description": "Tập thơ được sáng tác trong thời gian tù đày.",
        "summary": "Tác phẩm thể hiện tinh thần lạc quan và nghị lực.",
        "characters": "Tác giả",
        "barcode": "8931234567892"
    }
]


# Trang chủ và danh sách sách
@app.route("/")
def index():
    keyword = request.args.get("search", "").lower()
    category = request.args.get("category", "all")
    sort_by = request.args.get("sort", "popular")

    result = books.copy()

    # Tìm kiếm sách
    if keyword:
        result = [
            book for book in result
            if keyword in book["title"].lower()
            or keyword in book["author"].lower()
        ]

    # Lọc thể loại
    if category != "all":
        result = [
            book for book in result
            if book["category"] == category
        ]

    # Sắp xếp sách
    if sort_by == "name":
        result.sort(key=lambda book: book["title"])

    elif sort_by == "year":
        result.sort(key=lambda book: book["year"], reverse=True)

    return render_template(
        "index.html",
        books=result,
        search=keyword,
        category=category,
        sort=sort_by
    )


# Trang chi tiết sách
@app.route("/book/<int:book_id>")
def book_detail(book_id):
    for book in books:
        if book["id"] == book_id:
            return render_template("book_detail.html", book=book)

    return "Không tìm thấy sách!", 404


# Tra cứu sách bằng mã vạch
@app.route("/api/book/<barcode>")
def find_book(barcode):
    for book in books:
        if book["barcode"] == barcode:
            return jsonify(book)

    return jsonify({"message": "Không tìm thấy sách"}), 404


# Khởi chạy website
if __name__ == "__main__":
    app.run(debug=True)

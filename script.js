// script.js - Logic đã tách ra từ index.html
const books = [
  { id: "1", title: "TRUYỆN KIỀU", author: "Nguyễn Du", isbn: "STK-006073", category: "Văn học", coverImage: "https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-1-truy_n-ki_u.jpg", summary: "Truyện Kiều gồm 3.254 câu thơ lục bát, kể về cuộc đời 15 năm lưu lạc đầy chìm nổi của Thúy Kiều vì chữ hiếu mà hy sinh tình riêng.", message: "Đề cao giá trị nhân phẩm, khát vọng tự do yêu đương và tư tưởng 'Chữ Tâm kia mới bằng ba chữ Tài'.", takeaways: ["Lòng hiếu thảo cao đẹp và sự hy sinh vì gia đình.","Nghệ thuật miêu tả tâm lý nhân vật và cảnh ngụ tình bậc thầy.","Chữ Tâm và lòng nhân ái là giá trị cốt lõi của con người."] },
  { id: "2", title: "DẾ MÈN PHIÊU LƯU KÝ", author: "Tô Hoài", isbn: "9786042183246", category: "Văn học", coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_21128.jpg", summary: "Hành trình trưởng thành của Dế Mèn từ một chú dế kiêu căng, trải qua biến cố đã thức tỉnh và phiêu lưu bốn phương kết bạn cùng Dế Trũi.", message: "Tình bạn chân thành, lòng dũng cảm, tinh thần chuộng hòa bình và sự khiêm tốn.", takeaways: ["Bài học đắt giá về thói kiêu căng ngạo mạn.","Tình anh em hoạn nạn có nhau giữa Dế Mèn và Dế Trũi.","Khát vọng muôn loài kết làm anh em hòa bình."] },
  { id: "3", title: "HOÀNG TỬ BÉ", author: "Antoine de Saint-Exupéry", isbn: "9786042171922", category: "Văn học", coverImage: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_43176.jpg", summary: "Cuộc gặp gỡ kỳ diệu giữa viên phi công gặp nạn trên sa mạc Sahara và cậu bé đến từ tiểu tinh cầu B-612.", message: "Những điều cốt lõi nhất thì vô hình trong mắt trần; người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim.", takeaways: ["Người ta chỉ thấy rõ với trái tim, mắt thường không thấy được điều cốt lõi.","Bạn phải chịu trách nhiệm mãi mãi với những gì bạn đã thuần hóa.","Thời gian bạn dành cho bông hoa làm nàng trở nên quý giá."] },
  { id: "4", title: "COSMOS: VŨ TRỤ", author: "Carl Sagan", isbn: "9786047771233", category: "Khoa học", coverImage: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235227361.jpg", summary: "Khám phá 15 tỷ năm lịch sử tiến hóa của vũ trụ và hành trình tìm tòi khoa học của loài người.", message: "Trái Đất là ngôi nhà chung mong manh giữa vũ trụ bao la; chúng ta có trách nhiệm trân trọng và bảo vệ nó.", takeaways: ["Chúng ta đều là tro bụi của các vì sao kết tinh thành.","Tư duy hoài nghi khoa học đi cùng lòng bao dung.","Trách nhiệm bảo vệ hành tinh xanh của nhân loại."] }
];

let currentCategory = 'all';
let currentBook = null;

function setImageWithFallback(img, url){
  img.src = url;
  img.onerror = ()=>{ img.src = 'https://via.placeholder.com/240x320?text=No+Image'; };
}

function escapeHtml(str){ return String(str).replace(/[&<>\"]+/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

function renderBooks(){
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = books.filter(b=>{
    const matchCat = currentCategory==='all'||b.category===currentCategory;
    const matchQuery = !q||b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)||b.isbn.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  document.getElementById('bookCount').textContent = `Hiển thị ${filtered.length} cuốn sách`;
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = '';
  if(filtered.length===0){
    const empty = document.createElement('div'); empty.className='col-span-full p-6 bg-white rounded-2xl border border-gray-200 text-center text-gray-500'; empty.textContent='Không tìm thấy sách phù hợp.'; grid.appendChild(empty); return;
  }

  filtered.forEach(b=>{
    const card = document.createElement('div');
    card.className='card-elevated bg-white p-3 rounded-2xl border border-gray-200 hover:shadow-md cursor-pointer transition-all flex flex-col';
    card.tabIndex=0; card.setAttribute('role','button');
    card.addEventListener('click',()=>openBook(b.id));
    card.addEventListener('keydown',e=>{ if(e.key==='Enter') openBook(b.id); });

    const img=document.createElement('img'); img.className='w-full aspect-[3/4] object-cover rounded-xl mb-2'; img.alt=b.title+' - bìa sách'; img.loading='lazy'; setImageWithFallback(img,b.coverImage);
    const span=document.createElement('span'); span.className='text-[10px] font-bold text-orange-600'; span.textContent=b.category;
    const h4=document.createElement('h4'); h4.className='font-bold text-xs text-gray-900 truncate'; h4.textContent=b.title;
    const p=document.createElement('p'); p.className='text-[11px] text-gray-500 truncate'; p.textContent=b.author;
    const foot=document.createElement('div'); foot.className='mt-auto pt-2 border-t text-[11px] font-semibold text-orange-500 text-right'; foot.textContent='Xem chi tiết →';

    card.appendChild(img); card.appendChild(span); card.appendChild(h4); card.appendChild(p); card.appendChild(foot);
    grid.appendChild(card);
  });
}

function filterCategory(cat){ currentCategory=cat; document.querySelectorAll('.cat-btn').forEach(btn=>{ if(btn.dataset.cat===cat){ btn.classList.remove('bg-gray-100','text-gray-700'); btn.classList.add('bg-gray-900','text-white'); }else{ btn.classList.remove('bg-gray-900','text-white'); btn.classList.add('bg-gray-100','text-gray-700'); }}); renderBooks(); }

function openBook(id){ currentBook=books.find(b=>b.id===id); if(!currentBook) return; document.getElementById('modalCategory').textContent=currentBook.category; document.getElementById('modalTitle').textContent=currentBook.title; document.getElementById('modalAuthor').textContent=`Tác giả: ${currentBook.author}`; document.getElementById('modalIsbn').textContent=`Mã ISBN: ${currentBook.isbn}`; setImageWithFallback(document.getElementById('modalCover'),currentBook.coverImage); document.getElementById('modalMessage').textContent=currentBook.message; document.getElementById('modalSummary').textContent=currentBook.summary;
  const takeaways=document.getElementById('modalTakeaways'); takeaways.innerHTML=''; currentBook.takeaways.forEach(t=>{ const row=document.createElement('div'); row.className='flex items-start gap-1.5'; const dot=document.createElement('span'); dot.className='text-orange-500 font-bold'; dot.textContent='•'; const txt=document.createElement('span'); txt.textContent=t; row.appendChild(dot); row.appendChild(txt); takeaways.appendChild(row); });
  const chat=document.getElementById('chatBox'); chat.innerHTML=''; const info=document.createElement('div'); info.className='p-2 bg-white rounded-lg border text-gray-700'; info.innerHTML=`Đã mở thông tin tác phẩm <strong>"${escapeHtml(currentBook.title)}"</strong>. Bạn có thể hỏi về tác giả, bài học hoặc nội dung sách.`; chat.appendChild(info);
  document.getElementById('detailModal').classList.remove('hidden'); document.getElementById('questionInput').focus(); }

function closeModal(){ document.getElementById('detailModal').classList.add('hidden'); document.getElementById('searchInput').focus(); currentBook=null; }

function answerQuestion(){ const input=document.getElementById('questionInput'); const qRaw=input.value.trim(); const q=qRaw.toLowerCase(); if(!q||!currentBook) return; const chat=document.getElementById('chatBox'); const userBubble=document.createElement('div'); userBubble.className='p-2 bg-orange-500 text-white rounded-lg text-right max-w-[80%] ml-auto font-medium'; userBubble.textContent=qRaw; chat.appendChild(userBubble); input.value=''; let reply=''; if(q.includes('tác giả')||q.includes('ai viết')||q.includes('tác phẩm của')) reply=`Tác phẩm ${currentBook.title} được sáng tác bởi tác giả ${currentBook.author}.`; else if(q.includes('bài học')||q.includes('đúc kết')||q.includes('ý nghĩa')) reply=`Các bài học quan trọng của sách:\n`+currentBook.takeaways.map(t=>`• ${t}`).join('\n'); else if(q.includes('thông điệp')) reply=`Thông điệp của cuốn sách là: "${currentBook.message}"`; else reply=`Về cuốn sách "${currentBook.title}": ${currentBook.summary}`; const replyNode=document.createElement('div'); replyNode.className='p-2 bg-white rounded-lg border text-gray-800 whitespace-pre-line'; replyNode.textContent=reply; chat.appendChild(replyNode); chat.scrollTop=chat.scrollHeight; }

window.addEventListener('keydown',e=>{ if(e.key==='Escape' && !document.getElementById('detailModal').classList.contains('hidden')) closeModal(); });

document.addEventListener('DOMContentLoaded',()=>{ document.getElementById('categories').addEventListener('click',e=>{ const btn=e.target.closest('button[data-cat]'); if(!btn) return; filterCategory(btn.dataset.cat); }); document.getElementById('searchInput').addEventListener('input',()=>renderBooks()); document.getElementById('clearSearch').addEventListener('click',()=>{ document.getElementById('searchInput').value=''; renderBooks(); }); document.getElementById('closeModalBtn').addEventListener('click',closeModal); document.getElementById('askBtn').addEventListener('click',answerQuestion); document.getElementById('questionInput').addEventListener('keydown',e=>{ if(e.key==='Enter') answerQuestion(); }); filterCategory('all'); renderBooks(); });

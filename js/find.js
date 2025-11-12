const filterBtn = document.getElementById('filterBtn');
const overlay = document.getElementById('overlay');
const cancelBtn = document.getElementById('cancelBtn');
const optionButtons = document.querySelectorAll('.filter-btn');

filterBtn.addEventListener('click', () => overlay.style.display = 'flex');
cancelBtn.addEventListener('click', () => overlay.style.display = 'none');
overlay.addEventListener('click', e => { if(e.target === overlay) overlay.style.display = 'none'; });

optionButtons.forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});

// Chuyển trang khi bấm tìm kiếm trong popup
document.getElementById("popupSearchBtn").addEventListener("click", function(){
  let keyword = document.getElementById("popupSearchInput").value.trim();
  if(keyword) {
    window.location.href = "find.html?q=" + encodeURIComponent(keyword);
  }
});

document.getElementById("popupSearchInput").addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    document.getElementById("popupSearchBtn").click();
  }
});

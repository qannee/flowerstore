const filterBtn = document.getElementById('filterBtn');
const overlay = document.getElementById('overlay');
const cancelBtn = document.getElementById('cancelBtn');
const optionButtons = document.querySelectorAll('.filter-btn');

filterBtn.addEventListener('click', () => overlay.style.display = 'flex');
cancelBtn.addEventListener('click', () => overlay.style.display = 'none');
overlay.addEventListener('click', e => { if(e.target===overlay) overlay.style.display='none'; });
optionButtons.forEach(btn => btn.addEventListener('click', () => btn.classList.toggle('active')));
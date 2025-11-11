document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button.btn-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      // Lấy thông tin từ hàng được nhấn
      const name = row.children[1].innerText;
      const email = row.children[2].innerText;
      const phone = row.children[3].innerText;
      const orders = row.children[5].innerText;
      const total = row.children[6].innerText;

      // Gán dữ liệu vào modal
      document.getElementById('userName').innerText = name;
      document.getElementById('userEmail').innerText = email;
      document.getElementById('userPhone').innerText = phone;
      document.getElementById('userOrders').innerText = orders + " đơn hàng";
      document.getElementById('userAddress').innerText = "TP. Hồ Chí Minh";
      document.getElementById('userDate').innerText = "15/01/2024";

      // Hiện modal
      $('#userDetailModal').modal('show');
    });
  });
});

      function toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.toggle('show');
      }
      
      // Close dropdown when clicking outside
      window.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
          const dropdown = document.getElementById('userDropdown');
          dropdown.classList.remove('show');
        }
      });
      
      // Display current date
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = new Date().toLocaleDateString('vi-VN', dateOptions);
      if (document.getElementById('currentDate')) {
        document.getElementById('currentDate').textContent = currentDate;
      }

const ctxBest = document.getElementById('chartBestSelling').getContext('2d');
new Chart(ctxBest, {
  type: 'bar',
  data: {
    labels: ['Hoa hồng đỏ', 'Hoa baby trắng', 'Hoa tulip vàng', 'Hoa hướng dương', 'Hoa lan hồ điệp', 'Hoa cẩm chướng', 'Hoa sen hồng', 'Hoa đồng tiền'],
    datasets: [{
      label: 'Số lượng bán ra (bó)',
      data: [120, 95, 80, 75, 60, 50, 45, 40],
      backgroundColor: '#F1948A'
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

const ctxRevenue = document.getElementById('chartRevenue').getContext('2d');
new Chart(ctxRevenue, {
  type: 'line',
  data: {
    labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    datasets: [{
      label: 'Doanh thu (triệu VNĐ)',
      data: [50, 65, 80, 90, 120, 150, 135, 160, 180, 190, 200, 210],
      borderColor: '#C2185B',
      backgroundColor: 'rgba(194,24,91,0.15)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});
const orders = [
      {
        id: 'DH001',
        customer: { name: 'Quách A', phone: '0901 234 567', address: '123 Trần Hưng Đạo, Q1, TP.HCM' },
        date: '2025-06-18',
        status: 'new',
        items: [
          { flower: 'Hoa Hồng Đỏ', qty: 5, price: 15000 },
          { flower: 'Hoa Tulip Hồng', qty: 3, price: 25000 }
        ]
      },
      {
        id: 'DH002',
        customer: { name: 'Trần B', phone: '0902 345 678', address: '56 Nguyễn Huệ, Q1, TP.HCM' },
        date: '2025-07-19',
        status: 'processing',
        items: [
          { flower: 'Hoa Lan Trắng', qty: 2, price: 60000 },
          { flower: 'Hoa Cúc Vàng', qty: 4, price: 12000 }
        ]
      },
      {
        id: 'DH003',
        customer: { name: 'Phan C', phone: '0903 456 789', address: '22 Lý Thường Kiệt, Hà Nội' },
        date: '2025-10-20',
        status: 'delivered',
        items: [
          { flower: 'Hoa Hồng Trắng', qty: 10, price: 15000 }
        ]
      },
      {
        id: 'DH004',
        customer: { name: 'Lê D', phone: '0903 123 456', address: '22 Lý Thường Kiệt, TP HCM' },
        date: '2025-01-20',
        status: 'cancelled',
        items: [
          { flower: 'Hoa Hồng Trắng', qty: 10, price: 15000 },
          { flower: 'Hoa Cúc Vàng', qty: 4, price: 12000 }
        ]
      },
      {
        id: 'DH005',
        customer: { name: 'Nguyễn E', phone: '0904 567 890', address: '45 Lê Lợi, Q1, TP.HCM' },
        date: '2025-08-15',
        status: 'new',
        items: [
          { flower: 'Hoa Tulip Vàng', qty: 8, price: 20000 }
        ]
      },
      {
        id: 'DH006',
        customer: { name: 'Hoàng F', phone: '0905 678 901', address: '78 Nguyễn Trãi, Hà Nội' },
        date: '2025-09-22',
        status: 'delivered',
        items: [
          { flower: 'Hoa Cúc Trắng', qty: 6, price: 18000 }
        ]
      }
    ];

    const inventory = [
      { name: '🌹 Hoa Hồng Đỏ', type: 'rose', quantity: 5 },
      { name: '🌷 Hoa Tulip Vàng', type: 'tulip', quantity: 12 },
      { name: '🌸 Hoa Lan Hồ Điệp', type: 'orchid', quantity: 2 },
      { name: '🌼 Hoa Cúc Trắng', type: 'chrysanthemum', quantity: 8 }
    ];

    function convertStatus(status) {
      const map = {
        new: '<span style="color:#56ab2f;font-weight:bold">Mới đặt</span>',
        processing: '<span style="color:#d1a800;font-weight:bold">Đã xử lý</span>',
        delivered: '<span style="color:#007c2e;font-weight:bold">Đã giao</span>',
        cancelled: '<span style="color:red;font-weight:bold">Đã hủy</span>'
      };
      return map[status] || status;
    }

    function getStatusColor(status) {
      const colors = {
        new: '#56ab2f',
        processing: '#d1a800',
        delivered: '#007c2e',
        cancelled: 'red'
      };
      return colors[status] || '#333';
    }

    function loadOrders(list) {
      const tbody = document.querySelector('#orderTable tbody');
      tbody.innerHTML = '';
      list.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${o.id}</td>
          <td>${o.customer.name}</td>
          <td>${o.date}</td>
          <td>
            <select class="status-select" style="color: ${getStatusColor(o.status)}" onchange="updateStatus('${o.id}', this.value)">
              <option value="new" ${o.status === 'new' ? 'selected' : ''}>Mới đặt</option>
              <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Đã xử lý</option>
              <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Đã giao</option>
              <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
            </select>
          </td>
          <td><button class="detail-button" onclick="viewOrder('${o.id}')">Xem chi tiết</button></td>
        `;
        tbody.appendChild(tr);
      });
    }

    function updateStatus(orderId, newStatus, event) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const oldStatus = order.status;
  if (oldStatus === newStatus) return; // Không cần xác nhận nếu không thay đổi

  // Hiển thị hộp thoại xác nhận
  const confirmChange = confirm(`Bạn có chắc muốn thay đổi tình trạng đơn hàng ${orderId} 
từ "${getStatusText(oldStatus)}" sang "${getStatusText(newStatus)}"?`);

  if (!confirmChange) {
    // Nếu hủy, khôi phục lại lựa chọn ban đầu
    event.target.value = oldStatus;
    return;
  }

  // Cập nhật trạng thái đơn hàng
  order.status = newStatus;
  event.target.style.color = getStatusColor(newStatus);

  // Thông báo thành công
  showToast(`✅ Đã cập nhật tình trạng đơn hàng ${orderId} từ "${getStatusText(oldStatus)}" sang "${getStatusText(newStatus)}"`);
}


    function getStatusText(status) {
      const map = {
        new: 'Mới đặt',
        processing: 'Đã xử lý',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy'
      };
      return map[status] || status;
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.style.display = 'block';
      
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }

    function viewOrder(id) {
      const order = orders.find(o => o.id === id);
      if (!order) return;
      const itemsHTML = order.items.map(i => `
        <tr>
          <td>${i.flower}</td>
          <td>${i.qty}</td>
          <td>${i.price.toLocaleString()}₫</td>
          <td>${(i.qty * i.price).toLocaleString()}₫</td>
        </tr>`).join('');
      const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0);
      document.getElementById('orderDetail').innerHTML = `
        <p><b>Mã đơn hàng:</b> ${order.id}</p>
        <p><b>Khách hàng:</b> ${order.customer.name}</p>
        <p><b>Điện thoại:</b> ${order.customer.phone}</p>
        <p><b>Địa chỉ:</b> ${order.customer.address}</p>
        <p><b>Ngày đặt:</b> ${order.date}</p>
        <p><b>Tình trạng:</b> ${convertStatus(order.status)}</p>
        <table class="details-table">
          <tr><th>Tên hoa</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th></tr>
          ${itemsHTML}
        </table>
        <div class="total">Tổng cộng: ${total.toLocaleString()}₫</div>
      `;
      document.getElementById('orderModal').style.display = 'flex';
    }

    function closeModal() {
      const modal = document.getElementById('orderModal');
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = 'fadeIn 0.4s';
      }, 300);
    }

    function filterOrders() {
      const start = document.getElementById('startDate').value;
      const end = document.getElementById('endDate').value;
      const status = document.getElementById('status').value;
      const filtered = orders.filter(o => {
        const matchStatus = status === 'all' || o.status === status;
        const matchDate = (!start || o.date >= start) && (!end || o.date <= end);
        return matchStatus && matchDate;
      });
      loadOrders(filtered);
    }

    function loadInventory(list) {
      const tbody = document.querySelector('#inventoryTable tbody');
      if (!tbody) return;
      tbody.innerHTML = '';
      list.forEach(i => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i.name}</td><td>${getFlowerTypeName(i.type)}</td><td class='${i.quantity <= 3 ? 'low-stock' : ''}'>${i.quantity}</td>`;
        tbody.appendChild(tr);
      });
    }

    function getFlowerTypeName(type) {
      const map = { rose: 'Hoa hồng', tulip: 'Hoa tulip', orchid: 'Hoa lan', chrysanthemum: 'Hoa cúc' };
      return map[type] || type;
    }

    function filterInventory() {
      const type = document.getElementById('flowerType').value;
      const filtered = type === 'all' ? inventory : inventory.filter(i => i.type === type);
      loadInventory(filtered);
    }

    window.onload = () => {
      loadOrders(orders);
    };
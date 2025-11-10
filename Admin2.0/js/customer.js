        let users = [
            {
                id: 1,
                name: "Nguyễn Văn An",
                email: "nguyenvanan@email.com",
                phone: "0901234567",
                address: "123 Nguyễn Huệ, Q1, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=12",
                joinDate: "2024-01-15",
                status: "active",
                role: "customer",
                totalOrders: 15
            },
            {
                id: 2,
                name: "Trần Thị Bình",
                email: "tranthibinh@email.com",
                phone: "0912345678",
                address: "456 Lê Lợi, Q3, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=5",
                joinDate: "2024-02-20",
                status: "active",
                role: "customer",
                totalOrders: 8
            },
            {
                id: 3,
                name: "Lê Minh Cường",
                email: "leminhcuong@email.com",
                phone: "0923456789",
                address: "789 Trần Hưng Đạo, Q5, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=33",
                joinDate: "2023-11-10",
                status: "locked",
                role: "customer",
                totalOrders: 3
            },
            {
                id: 4,
                name: "Phạm Thị Dung",
                email: "phamthidung@email.com",
                phone: "0934567890",
                address: "321 Võ Văn Tần, Q3, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=9",
                joinDate: "2024-03-05",
                status: "active",
                role: "customer",
                totalOrders: 22
            },
            {
                id: 5,
                name: "Hoàng Văn Em",
                email: "hoangvanem@email.com",
                phone: "0945678901",
                address: "654 Hai Bà Trưng, Q1, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=60",
                joinDate: "2024-02-28",
                status: "active",
                role: "customer",
                totalOrders: 5
            },
            {
                id: 6,
                name: "Đặng Thị Phương",
                email: "dangthiphuong@email.com",
                phone: "0956789012",
                address: "987 Cách Mạng Tháng 8, Q10, TP.HCM",
                avatar: "https://i.pravatar.cc/150?img=20",
                joinDate: "2023-12-01",
                status: "locked",
                role: "customer",
                totalOrders: 1
            }
        ];
        
        let currentFilter = 'all';

        function updateStats() {
            // Không cần cập nhật stats nữa vì đã xóa phần thống kê
        }

        function renderUsers(filteredUsers = null) {
            const userList = document.getElementById('userList');
            const emptyState = document.getElementById('emptyState');
            
            // Luôn hiển thị tất cả người dùng
            filteredUsers = users;
            
            if (filteredUsers.length === 0) {
                userList.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }
            
            emptyState.style.display = 'none';
            let html = '';
            
            filteredUsers.forEach(user => {
                const lockedClass = user.status === 'locked' ? 'locked' : '';
                const statusBadge = user.status === 'active' 
                    ? '<span class="badge-status badge-active"><i class="fas fa-check-circle"></i> Hoạt động</span>'
                    : '<span class="badge-status badge-locked"><i class="fas fa-lock"></i> Bị khóa</span>';
                
                html += `
                    <div class="user-card ${lockedClass}" data-user-id="${user.id}">
                        <div class="row align-items-center">
                            <div class="col-md-1 col-sm-2 text-center">
                                <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                            </div>
                            <div class="col-md-6 col-sm-10 mt-2 mt-sm-0">
                                <h5 class="mb-2">
                                    ${user.name}
                                    <span class="badge-role"><i class="fas fa-user"></i> Khách hàng</span>
                                    ${statusBadge}
                                </h5>
                                <p class="mb-0 text-muted small">
                                    <i class="fas fa-envelope"></i> ${user.email}<br>
                                    <i class="fas fa-phone"></i> ${user.phone}<br>
                                    <i class="fas fa-map-marker-alt"></i> ${user.address}<br>
                                    <i class="fas fa-calendar-alt"></i> Tham gia: ${formatDate(user.joinDate)} | 
                                    <i class="fas fa-shopping-cart"></i> Đơn hàng: ${user.totalOrders}
                                </p>
                            </div>
                            <div class="col-md-5 col-sm-12 mt-2 mt-md-0">
                                <div class="action-buttons">
                                    <button class="btn btn-view" onclick="viewUserDetail(${user.id})">
                                        <i class="fas fa-eye"></i> Xem
                                    </button>
                                    <button class="btn btn-reset" onclick="resetPassword(${user.id})">
                                        <i class="fas fa-key"></i> Reset MK
                                    </button>
                                    ${user.status === 'active' ? `
                                        <button class="btn btn-lock" onclick="lockUser(${user.id})">
                                            <i class="fas fa-lock"></i> Khóa
                                        </button>
                                    ` : `
                                        <button class="btn btn-unlock" onclick="unlockUser(${user.id})">
                                            <i class="fas fa-unlock"></i> Mở khóa
                                        </button>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            userList.innerHTML = html;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        }

        function viewUserDetail(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            document.getElementById('detailAvatar').src = user.avatar;
            document.getElementById('detailName').textContent = user.name;
            document.getElementById('detailEmail').textContent = user.email;
            document.getElementById('detailPhone').textContent = user.phone;
            document.getElementById('detailAddress').textContent = user.address;
            document.getElementById('detailJoinDate').textContent = formatDate(user.joinDate);
            document.getElementById('detailOrders').textContent = `${user.totalOrders} đơn hàng`;
            
            const statusHtml = user.status === 'active' 
                ? '<span class="badge-status badge-active"><i class="fas fa-check-circle"></i> Hoạt động</span>'
                : '<span class="badge-status badge-locked"><i class="fas fa-lock"></i> Bị khóa</span>';
            document.getElementById('detailStatus').innerHTML = statusHtml;
            
            $('#userDetailModal').modal('show');
        }

        function resetPassword(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            if (confirm(`Bạn có chắc chắn muốn reset mật khẩu cho tài khoản "${user.name}"?\n\nMật khẩu mới sẽ được gửi qua email: ${user.email}`)) {
                const newPassword = 'Flower' + Math.floor(Math.random() * 10000);
                alert(`✅ Reset mật khẩu thành công!\n\nMật khẩu mới: ${newPassword}\n\nĐã gửi email thông báo đến: ${user.email}`);
            }
        }

        function lockUser(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            if (confirm(`Bạn có chắc chắn muốn khóa tài khoản "${user.name}"?\n\nNgười dùng sẽ không thể đăng nhập sau khi bị khóa.`)) {
                //user.status = 'locked';
                alert(`🔒 Đã khóa tài khoản "${user.name}" thành công!`);
                updateStats();
                renderUsers();
            }
        }

        function unlockUser(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            if (confirm(`Bạn có chắc chắn muốn mở khóa tài khoản "${user.name}"?`)) {
                //user.status = 'active';
                alert(`🔓 Đã mở khóa tài khoản "${user.name}" thành công!`);
                updateStats();
                renderUsers();
            }
        }

        function filterUsers(filter) {
           currentFilter = filter;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Đặt lại nút đang chọn có class 'active'
    if (filter === 'all') buttons[0].classList.add('active');
    if (filter === 'active') buttons[1].classList.add('active');
    if (filter === 'locked') buttons[2].classList.add('active');

    // Lọc người dùng theo trạng thái
    let filteredUsers = [];
    if (filter === 'all') {
        filteredUsers = users;
    } else {
        filteredUsers = users.filter(user => user.status === filter);
    }

    renderUsers(filteredUsers);
        }

        function searchUsers() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            const toastBody = document.querySelector('#searchToast .toast-body');
            
            if (searchTerm === "") {
                toastBody.innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng nhập từ khóa tìm kiếm!';
            } else {
                toastBody.innerHTML = `<i class="fas fa-search"></i> Bạn vừa tìm kiếm: "<strong>${searchTerm}</strong>"`;
            }
            
            $('#searchToast').toast('show');
        }

        // Xử lý sự kiện Enter trong ô tìm kiếm
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchUsers();
            }
        });

        // Xử lý sự kiện click vào icon tìm kiếm
        document.getElementById('searchButton').addEventListener('click', function() {
            searchUsers();
        });

        // Khởi tạo
        updateStats();
        renderUsers();
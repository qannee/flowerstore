        let products = [
            {id: 1, code: "SP001", name: "Hoa Hồng Đỏ", category: "Hoa hồng", cost: 80000, profitMargin: 50, salePrice: 120000, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300", description: "Hoa hồng đỏ tươi, tượng trưng cho tình yêu", hidden: false},
            {id: 2, code: "SP002", name: "Hoa Ly Trắng", category: "Hoa ly", cost: 100000, profitMargin: 40, salePrice: 140000, image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=300", description: "Hoa ly trắng tinh khôi", hidden: false},
            {id: 3, code: "SP003", name: "Hoa Tulip Vàng", category: "Hoa tulip", cost: 60000, profitMargin: 60, salePrice: 96000, image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=300", description: "Hoa tulip vàng rực rỡ", hidden: false}
        ];
         
        let profitSettings = {"Hoa hồng": 50, "Hoa tulip": 60, "Hoa lan": 70, "Hoa cúc": 45, "Hoa ly": 40, "Hoa hướng dương": 55};
        let editingId = null;

        const imageUploadContainer = document.getElementById('imageUploadContainer');
        const imageInput = document.getElementById('productImageInput');
        const imagePreview = document.getElementById('imagePreview');
        const productImageHidden = document.getElementById('productImage');

        imageInput.addEventListener('change', handleImageSelect);
        imageUploadContainer.addEventListener('dragover', (e) => { e.preventDefault(); imageUploadContainer.classList.add('dragover'); });
        imageUploadContainer.addEventListener('dragleave', () => { imageUploadContainer.classList.remove('dragover'); });
        imageUploadContainer.addEventListener('drop', (e) => { e.preventDefault(); imageUploadContainer.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) handleImageFile(files[0]); });

        function handleImageSelect(e) { const file = e.target.files[0]; if (file) handleImageFile(file); }
        
        function handleImageFile(file) {
            if (!file.type.startsWith('image/')) { alert('Vui lòng chọn file ảnh!'); return; }
            if (file.size > 5 * 1024 * 1024) { alert('Kích thước ảnh không được vượt quá 5MB!'); return; }
            const reader = new FileReader();
            reader.onload = (e) => { imagePreview.src = e.target.result; imagePreview.style.display = 'block'; productImageHidden.value = e.target.result; };
            reader.readAsDataURL(file);
        }

        function formatPrice(price) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price); }

        function renderProducts() {
            const productList = document.getElementById('productList');
            const emptyState = document.getElementById('emptyState');
            if (products.length === 0) { productList.innerHTML = ''; emptyState.style.display = 'block'; return; }
            emptyState.style.display = 'none';
            let html = '';
            products.forEach(product => {
                const profit = product.salePrice - product.cost;
                html += `<div class="product-card" data-product-id="${product.id}"><div class="row align-items-center"><div class="col-md-2 col-sm-3 text-center"><img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'"></div><div class="col-md-6 col-sm-9"><div class="product-code"><i class="fas fa-barcode"></i> ${product.code}</div><h5 class="mb-1">${product.name}<span class="category-badge">${product.category}</span></h5><p class="text-muted mb-0 small">${product.description || 'Chưa có mô tả'}</p><div class="price-info"><div class="price-row"><span class="price-label">💰 Giá vốn:</span><span class="price-value">${formatPrice(product.cost)}</span></div><div class="price-row"><span class="price-label">📊 Lợi nhuận:</span><span class="price-value"><span class="profit-badge">${product.profitMargin}%</span> (+${formatPrice(profit)})</span></div><div class="price-row"><span class="price-label">💵 Giá bán:</span><span class="price-value" style="color: #82B440; font-size: 1.1em;">${formatPrice(product.salePrice)}</span></div></div></div><div class="col-md-4 col-sm-12 mt-3 mt-md-0"><div class="action-buttons"><button class="btn btn-edit" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i> Sửa</button></div></div></div></div>`;
            });
            productList.innerHTML = html;
        }

        function showAddModal() {
            editingId = null;
            document.getElementById('modalTitle').textContent = 'Thêm sản phẩm mới';
            document.getElementById('productForm').reset();
            imagePreview.style.display = 'none';
            imagePreview.src = '';
            productImageHidden.value = '';
            document.getElementById('productSalePrice').value = '';
            $('#productModal').modal('show');
        }

        function updateProfitMargin() {
            const category = document.getElementById('productCategory').value;
            if (category && profitSettings[category]) {
                document.getElementById('productProfitMargin').value = profitSettings[category];
                calculateSalePrice();
            }
        }

        function calculateSalePrice() {
            const cost = parseFloat(document.getElementById('productCost').value) || 0;
            const profitMargin = parseFloat(document.getElementById('productProfitMargin').value) || 0;
            if (cost > 0 && profitMargin >= 0) {
                const salePrice = cost + (cost * profitMargin / 100);
                document.getElementById('productSalePrice').value = Math.round(salePrice);
            } else {
                document.getElementById('productSalePrice').value = '';
            }
        }

        function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;
            editingId = id;
            document.getElementById('modalTitle').textContent = 'Chỉnh sửa sản phẩm';
            document.getElementById('productId').value = product.id;
            document.getElementById('productCode').value = product.code;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productCost').value = product.cost;
            document.getElementById('productProfitMargin').value = product.profitMargin;
            document.getElementById('productSalePrice').value = product.salePrice;
            document.getElementById('productDescription').value = product.description || '';
            if (product.image) { imagePreview.src = product.image; imagePreview.style.display = 'block'; productImageHidden.value = product.image; }
            $('#productModal').modal('show');
        }

        function saveProduct() {
    const code = document.getElementById('productCode').value.trim();
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const cost = parseFloat(document.getElementById('productCost').value);
    const profitMargin = parseFloat(document.getElementById('productProfitMargin').value);
    const salePrice = parseFloat(document.getElementById('productSalePrice').value);
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();

    

    // Không thay đổi dữ liệu thật — chỉ hiển thị thông báo
    if (editingId) {
        alert('✅ Bạn đã sửa xong sản phẩm ');
    } else {
        alert('✅ Bạn đã thêm sản phẩm mới ');
    }

    $('#productModal').modal('hide');
    renderProducts(); // chỉ để hiển thị lại danh sách, không thay đổi gì
}


        document.getElementById("searchButton").addEventListener("click", handleSearch);
        document.getElementById("searchInput").addEventListener("keypress", function(event) { if (event.key === "Enter") { event.preventDefault(); handleSearch(); } });

        function handleSearch() {
            const searchTerm = document.getElementById("searchInput").value.trim();
            if (searchTerm === "") {
                alert("Vui lòng nhập nội dung cần tìm kiếm!");
            } else {
                renderProducts();
                alert(`Đã tìm thấy sản phẩm`);
            }
        }

        function showProfitSettings() {
            const tbody = document.getElementById('profitSettingsBody');
            tbody.innerHTML = '';
            for (const [category, margin] of Object.entries(profitSettings)) {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td><strong>${category}</strong></td><td><input type="number" class="profit-input" data-category="${category}" value="${margin}" min="0" max="1000" step="0.1"><span style="margin-left: 5px;">%</span></td>`;
                tbody.appendChild(tr);
            }
            $('#profitSettingsModal').modal('show');
        }

        function saveProfitSettings() {
            const inputs = document.querySelectorAll('.profit-input');
            inputs.forEach(input => {
                const category = input.getAttribute('data-category');
                const value = parseFloat(input.value) || 0;
                profitSettings[category] = value;
            });
            alert('Đã lưu cài đặt tỉ lệ lợi nhuận thành công!');
            $('#profitSettingsModal').modal('hide');
        }

        renderProducts();
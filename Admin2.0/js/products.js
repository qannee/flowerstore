let products = [
            {
                id: 1,
                code: "SP001",
                name: "Hoa Hồng Đỏ",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300",
                description: "Hoa hồng đỏ tươi, tượng trưng cho tình yêu",
                hidden: false
            },
            {
                id: 2,
                code: "SP002",
                name: "Hoa Ly Trắng",
                image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=300",
                description: "Hoa ly trắng tinh khôi",
                hidden: false
            },
            {
                id: 3,
                code: "SP003",
                name: "Hoa Tulip Vàng",
                image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=300",
                description: "Hoa tulip vàng rực rỡ",
                hidden: false
            }
        ];
        
        let editingId = null;
        let currentFilter = 'all';

        // Image Upload Handler
        const imageUploadContainer = document.getElementById('imageUploadContainer');
        const imageInput = document.getElementById('productImageInput');
        const imagePreview = document.getElementById('imagePreview');
        const productImageHidden = document.getElementById('productImage');

        imageInput.addEventListener('change', handleImageSelect);

        imageUploadContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadContainer.classList.add('dragover');
        });

        imageUploadContainer.addEventListener('dragleave', () => {
            imageUploadContainer.classList.remove('dragover');
        });

        imageUploadContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadContainer.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageFile(files[0]);
            }
        });

        function handleImageSelect(e) {
            const file = e.target.files[0];
            if (file) {
                handleImageFile(file);
            }
        }

        function handleImageFile(file) {
            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh!');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước ảnh không được vượt quá 5MB!');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                imagePreview.src = base64Image;
                imagePreview.style.display = 'block';
                productImageHidden.value = base64Image;
            };
            reader.readAsDataURL(file);
        }

        function renderProducts() {
            const productList = document.getElementById('productList');
            const emptyState = document.getElementById('emptyState');
            
            let filteredProducts = products;
            
            if (currentFilter === 'visible') {
                filteredProducts = products.filter(p => !p.hidden);
            } else if (currentFilter === 'hidden') {
                filteredProducts = products.filter(p => p.hidden);
            }
            
            if (filteredProducts.length === 0) {
                productList.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }
            
            emptyState.style.display = 'none';
            let html = '';
            
            filteredProducts.forEach(product => {
                const hiddenClass = product.hidden ? 'hidden-product' : '';
                
                html += `
                    <div class="product-card ${hiddenClass}" data-product-id="${product.id}">
                        <div class="row align-items-center">
                            <div class="col-md-2 col-sm-3 text-center">
                                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'">
                            </div>
                            <div class="col-md-7 col-sm-9">
                                <div class="product-code"><i class="fas fa-barcode"></i> ${product.code}</div>
                                <h5 class="mb-1">
                                    ${product.name}
                                    ${product.hidden ? '<span class="badge-hidden"><i class="fas fa-eye-slash"></i> Đang ẩn</span>' : ''}
                                </h5>
                                <p class="text-muted mb-0 small">${product.description || 'Chưa có mô tả'}</p>
                            </div>
                            <div class="col-md-3 col-sm-12 mt-3 mt-md-0">
                                <div class="action-buttons">
                                    <button class="btn btn-edit" onclick="editProduct(${product.id})">
                                        <i class="fas fa-edit"></i> Sửa
                                    </button>
                                    <button class="btn btn-delete" onclick="deleteProduct(${product.id})">
                                        <i class="fas fa-trash"></i> Xóa
                                    </button>
                                    <button class="btn btn-toggle ${product.hidden ? 'hidden' : ''}" onclick="toggleProduct(${product.id})">
                                        <i class="fas fa-eye${product.hidden ? '' : '-slash'}"></i> ${product.hidden ? 'Hiện' : 'Ẩn'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
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
            $('#productModal').modal('show');
        }

        function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;
            
            editingId = id;
            document.getElementById('modalTitle').textContent = 'Chỉnh sửa sản phẩm';
            document.getElementById('productId').value = product.id;
            document.getElementById('productCode').value = product.code;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description || '';
            document.getElementById('flowerTypeSelect').value = product.color || '';
        document.getElementById('productQuantity').value = product.defaultQuantity || 1;
            if (product.image) {
                imagePreview.src = product.image;
                imagePreview.style.display = 'block';
                productImageHidden.value = product.image;
            }
            
            $('#productModal').modal('show');
        }

    function saveProduct() {
    const code = document.getElementById('productCode').value.trim();
    const name = document.getElementById('productName').value.trim();
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim(); 
    
    
    

    // ✅ Khi sửa sản phẩm
    if (editingId) {
        alert('✏️ Bạn đã sửa sản phẩm!\n');
    } 
    // ✅ Khi thêm sản phẩm mới
    else {
        alert('🌸 Bạn đã thêm sản phẩm mới!\n');
    }

    $('#productModal').modal('hide');
    renderProducts();
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (confirm(`🗑️ Bạn có chắc muốn xóa sản phẩm "${product.name}" không?\n`)) {
        alert('✅ Đã Xóa sản phẩm!\n');
    }
}


        function toggleProduct(id) {
            const product = products.find(p => p.id === id);
            if (product) {
                product.hidden = !product.hidden;
                renderProducts();
            }
        }

        function filterProducts(filter) {
            currentFilter = filter;
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            event.target.classList.add('active');
            
            renderProducts();
        }

        function searchProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productId = parseInt(card.getAttribute('data-product-id'));
                const product = products.find(p => p.id === productId);
                
                if (product && (product.name.toLowerCase().includes(searchTerm) || product.code.toLowerCase().includes(searchTerm))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        document.getElementById("searchButton").addEventListener("click", handleSearch);
        document.getElementById("searchInput").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSearch();
            }
        });

        function handleSearch() {
            const searchTerm = document.getElementById("searchInput").value.trim();
            if (searchTerm === "") {
                alert("Vui lòng nhập nội dung cần tìm kiếm!");
            } else {
                alert(`Đã tìm thấy: "${searchTerm}"`);
            }
        }

        renderProducts();

        

        
let flowerTypes = [
  { id: 1, name: "Hoa J97",quantity: 120, hidden: false },
    { id: 2, name: "Hoa lễ",quantity: 20, hidden: false },
    { id: 3, name: "Hoa trang trí",quantity: 30, hidden: false },
    { id: 4, name: "Hoa tết",quantity: 77, hidden: false },
    { id: 5, name: "Hoa cúng",quantity: 33, hidden: false }
];
function openFlowerTypeModal() {
  renderFlowerTypeTable();
  $('#flowerTypeModal').modal('show');
}

function renderFlowerTypeTable() {
  const tbody = document.getElementById('flowerTypeTable');
  tbody.innerHTML = '';
  flowerTypes.forEach(type => {
    const hiddenClass = type.hidden ? 'text-muted' : '';
    const hiddenLabel = type.hidden ? '<span class="badge badge-secondary">Ẩn</span>' : '';
    tbody.innerHTML += `
      <tr class="${hiddenClass}">
        <td>${type.name} ${hiddenLabel}</td>
        <td>${type.quantity}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editFlowerType(${type.id})"><i class="fas fa-edit"></i> Sửa</button>
          <button class="btn btn-sm btn-danger" onclick="deleteFlowerType(${type.id})"><i class="fas fa-trash"></i> Xóa</button>
          <button class="btn btn-sm btn-secondary" onclick="toggleFlowerType(${type.id})">
            <i class="fas fa-eye${type.hidden ? '' : '-slash'}"></i> ${type.hidden ? 'Hiện' : 'Ẩn'}
          </button>
        </td>
      </tr>
    `;
  });
}

function editFlowerType(id) {
  const type = flowerTypes.find(t => t.id === id);
  if (!type) return;
  document.getElementById('editFlowerTypeId').value = type.id;
  document.getElementById('editFlowerTypeName').value = type.name;
  document.getElementById('editFlowerQuantity').value = type.quantity;
  $('#editFlowerTypeModal').modal('show');
}

function saveFlowerTypeEdit() {
  const id = parseInt(document.getElementById('editFlowerTypeId').value);
  const name = document.getElementById('editFlowerTypeName').value.trim();
  const quantity = parseInt(document.getElementById('editFlowerQuantity').value);
  /*if (!name || isNaN(quantity)) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }*/
  const type = flowerTypes.find(t => t.id === id);
  if (type) {
    //type.name = name;
    //type.quantity = quantity;
    alert("✅ Đã lưu thay đổi loại hoa!");
  }
  $('#editFlowerTypeModal').modal('hide');
  renderFlowerTypeTable();
}

function deleteFlowerType(id) {
  const type = flowerTypes.find(t => t.id === id);
  if (!type) return;
  if (confirm(`Bạn có chắc muốn xóa "${type.name}"?`)) {
    //flowerTypes = flowerTypes.filter(t => t.id !== id);
    alert("🗑️ Đã xóa loại hoa!");
    renderFlowerTypeTable();
  }
}

function toggleFlowerType(id) {
  const type = flowerTypes.find(t => t.id === id);
  if (type) {
    type.hidden = !type.hidden;
    renderFlowerTypeTable();
  }
}
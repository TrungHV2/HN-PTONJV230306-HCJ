var products = JSON.parse(localStorage.getItem('products')) || [];
var categories = JSON.parse(localStorage.getItem('categories')) || [];
// load danh mục sản phẩm
function loadCategories() {
    let opts = '<option value="">Danh mục sản phẩm</option>';
    for (let c of categories) {
        opts += `<option value="${c.id}">${c.name}</option>`;
    }
    $('#proCat').html(opts);
}
loadCategories();
function loadProducts() {
    let rows = '';
    for (let p of products) {
        rows += `<tr>
                    <td>${p.id}</td>
                    <td>
                        ${p.name}
                        <img width="150" src="../Origine/${p.images}" alt="" />
                    </td>
                    <td>${p.price} VNĐ</td>
                    <td>${categories.find(c => c.id == p.categoryId)?.name}</td>
                    <td>${p.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editProduct(event, '${p.id}')">Sửa</button> 
                        <button class="btn btn-danger" onclick="delProduct(event, '${p.id}')">Xóa</button>
                    </td>
                </tr>`;
    }
    $('.tbl_products').html(rows);
}
function save() {
    let prodId = $('#proId').val();
    let fileName = document.getElementById('proImage').files[0].name;
    if (prodId) {
        let product = products.find(p => p.id == prodId);
        if (product) { // cập nhật
            product.name = $('#proName').val();
            product.price = $('#price').val();
            product.categoryId = $('#proCat').val();
            product.images = 'assets/images/product/' + fileName;
            product.status = $('#proStt').is(':checked');
        } else { // thêm mới
            products.push({
                id: prodId,
                name: $('#proName').val(),
                price: $('#price').val(),
                categoryId: $('#proCat').val(),
                images: 'assets/images/product/' + fileName,
                status: $('#proStt').is(':checked')
            });
        }
        loadProducts();
        localStorage.setItem('products', JSON.stringify(products));
    }
}
loadProducts();
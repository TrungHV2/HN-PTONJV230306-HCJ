var listProducts = JSON.parse(localStorage.getItem('products')) || [];

function loadProduct() {
    let item = '';
    for (let p of listProducts.filter(p => p.status)) {
        item += `<div class="item">
                    <div class="product-wrap">
                        <a href="#">
                            <div class="item-img">
                                <img src="${p.images}" alt="">
                            </div>
                            <span class="item-sale">Sale !</span>


                            <span class="item-heart">
                                <i class="fa fa-heart-o head-icon" aria-hidden="true"> </i>
                            </span>

                            <div class="price">${p.price}</div>
                            <div class="name">${p.name}</div>
                            <div class="wrap-btn"><button class="btn-buy" onclick="buy(event, '${p.id}')">Mua</button></div>
                        </a>
                    </div>
                </div>`
    }
    $('.list-product').html(item);
}

// Khai báo biến giỏ hàng
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

// XỬ LÝ MUA HÀNG
// Hiển thị giỏ hàng
function showCarts() {
    $('.total-carts-item').html(carts.length);
    // tính tổng tiền
    let total = 0;
    for (let c of carts) {
        total += (c.quantity * c.price);
    }
}
// Mua hàng
function buy(evt, proId) {
    // Kiểm tra xem sp đó đã được mua chưa
    let cartItem = carts.find(c => c.productId == proId);
    if (cartItem) { // tăng số lượng
        cartItem.quantity += 1;
    } else {
        // Thêm sản phẩm được mua vào giỏ hàng
        carts.push({
            productId: proId,
            price: 0,
            quantity: 1
        });
    }
    // Lưu session
    sessionStorage.setItem('carts', JSON.stringify(carts));
    showCarts();
}
showCarts();
loadProduct();
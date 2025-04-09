
var giohang = [];

window.onload = function () {
    var savedCart = localStorage.getItem("giohang");
    if (savedCart) {
        giohang = JSON.parse(savedCart);
        renderCart();
        updateTotalPrice();
    }

    var savedCartQuantity = localStorage.getItem("cartQuantity");
    var cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
        cartBadge.innerText = savedCartQuantity ? savedCartQuantity : 0;
    }
};

function renderCart() {
    var cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; 

    giohang.forEach(function (item, index) {
        var itemHTML = `
            <tr class="cart-item">
                <td><input type="checkbox" class="select-item" data-index="${index}" onclick="onItemCheckboxChange()"></td>
                <td class="cart-item-name">
                    <div class="cart-item-info">
                        <img src="${item[0]}" alt="${item[2]}" class="cart-item-image" width="200" height="200">
                        <span class="cart-item-title"  >${item[2]}</span>
                    </div>
                </td>
                <td>
                    <span class="color-box" style="background-color: ${item[3]}; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 2px solid black;"></span>
                </td>
                <td>
                    <input type="number" value="${item[4]}" min="1" onchange="updateQuantity(this, ${index})">
                </td>
                <td>${item[1]}</td>
                <td>
                    <button onclick="removeFromCart(${index})" class="remove-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    updateCartBadge();
}

document.getElementById("btn-purchase").addEventListener("click", () => {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll(".product-checkbox");

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const index = parseInt(checkbox.dataset.index, 10);
            selectedItems.push(cartItems[index]); 
        }
    });

    if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để mua!");
        return;
    }

   
    localStorage.setItem("thongTinThanhToan", JSON.stringify(selectedItems));

    
    window.location.href = "thanhToan.html";
});


function removeFromCart(index) {
    giohang.splice(index, 1); 
    localStorage.setItem("giohang", JSON.stringify(giohang)); 
    renderCart(); 
    updateTotalPrice(); 
}

function updateQuantity(inputElement, index) {
    var newQuantity = parseInt(inputElement.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
        inputElement.value = giohang[index][4];
        alert("Số lượng phải là số nguyên lớn hơn 0.");
        return;
    }
    giohang[index][4] = newQuantity;
    localStorage.setItem("giohang", JSON.stringify(giohang));
    updateTotalPrice();
}

function updateTotalPrice() {
    var totalPrice = 0;
    var totalQuantity = 0;

    document.querySelectorAll('.select-item:checked').forEach(function (checkbox) {
        var index = parseInt(checkbox.dataset.index);
        var item = giohang[index];
        var price = parseFloat(item[1].replace(/[^\d.-]/g, ""));
        totalPrice += price * item[4];
        totalQuantity += item[4];
    });

    document.getElementById("total-price").innerText = totalPrice.toLocaleString() + " VND";
    document.getElementById("total-quantity").innerText = totalQuantity + " sản phẩm";

    updateCartBadge();
}

function updateCartBadge() {
    var totalQuantity = giohang.reduce(function (sum, item) {
        return sum + item[4];
    }, 0);

    var cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
        cartBadge.innerText = totalQuantity;
    }

    localStorage.setItem("cartQuantity", totalQuantity);
}

function toggleSelectAll(selectAllCheckbox) {
    var checkboxes = document.querySelectorAll('.select-item');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
    });

    updateTotalPrice();
}

function updateSelectAllCheckbox() {
    var checkboxes = document.querySelectorAll('.select-item');
    var selectAllCheckbox = document.getElementById('select-all');

    var allSelected = Array.from(checkboxes).every(function (checkbox) {
        return checkbox.checked;
    });

    selectAllCheckbox.checked = allSelected;
}

function onItemCheckboxChange() {
    updateTotalPrice();
    updateSelectAllCheckbox();
}

document.getElementById('select-all').addEventListener('click', function () {
    toggleSelectAll(this);
});
function chuyenDenTrangThanhToan() {
    if (giohang.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }


    const selectedItems = [];
    const checkboxes = document.querySelectorAll(".select-item");

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const index = parseInt(checkbox.dataset.index, 10);
            selectedItems.push(giohang[index]); 
        }
    });

    if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
        return;
    }


    localStorage.setItem("thongTinThanhToan", JSON.stringify(selectedItems));

    window.location.href = "thanhToan.html";
}
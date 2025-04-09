document.addEventListener("DOMContentLoaded", () => {
    // Cập nhật tổng tiền và số lượng khi thay đổi số lượng
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const minusButtons = document.querySelectorAll(".minus");
    const plusButtons = document.querySelectorAll(".plus");
    const totalPriceElement = document.getElementById("total-price");
    const totalQuantityElement = document.getElementById("total-quantity");
    const selectAllCheckbox = document.getElementById("select-all");
    const productCheckboxes = document.querySelectorAll(".product-checkbox");

    // Hàm tính tổng tiền và số lượng các sản phẩm đã chọn
    function updateTotalPrice() {
        let total = 0;
        let totalQuantity = 0;

        // Duyệt qua tất cả các sản phẩm trong giỏ hàng
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseInt(item.getAttribute('data-price')); // Giá sản phẩm
            const quantity = parseInt(item.querySelector('.quantity-input').value); // Số lượng sản phẩm
            const isChecked = item.querySelector('.product-checkbox').checked; // Kiểm tra nếu sản phẩm được chọn
            
            if (isChecked) {
                total += price * quantity; // Cộng tiền cho sản phẩm đã chọn
                totalQuantity += quantity; // Cộng số lượng cho sản phẩm đã chọn
            }
        });

        // Cập nhật tổng tiền và tổng số lượng vào giao diện trong ô "Tạm tính"
        totalPriceElement.textContent = total.toLocaleString() + ' VND';
        totalQuantityElement.textContent = totalQuantity + ' sản phẩm';
    }

    // Cập nhật tổng tiền khi thay đổi số lượng
    minusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let value = parseInt(quantityInputs[index].value);
            if (value > 1) {
                quantityInputs[index].value = value - 1;
                updateTotalPrice(); // Cập nhật tổng tiền và số lượng
            }
        });
    });

    plusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let value = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = value + 1;
            updateTotalPrice(); // Cập nhật tổng tiền và số lượng
        });
    });

    // Cập nhật tổng tiền khi nhập số lượng trực tiếp
    quantityInputs.forEach(input => {
        input.addEventListener("input", () => {
            updateTotalPrice(); // Cập nhật tổng tiền và số lượng
        });
    });

    // Xử lý chọn tất cả checkbox
    selectAllCheckbox.addEventListener("change", () => {
        productCheckboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked; // Chọn hoặc bỏ chọn tất cả
        });
        updateTotalPrice(); // Cập nhật tổng tiền và số lượng khi chọn tất cả
    });

    // Xử lý khi chọn/deselect checkbox từng sản phẩm
    productCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            // Nếu tất cả các checkbox đều được chọn, đánh dấu "Chọn tất cả"
            selectAllCheckbox.checked = [...productCheckboxes].every((checkbox) => checkbox.checked);
            updateTotalPrice(); // Cập nhật tổng tiền và số lượng khi thay đổi checkbox
        });
    });

    // Xử lý sự kiện khi nhấn nút Mua hàng
    const orderButton = document.getElementById("order-button");
    orderButton.addEventListener("click", () => {
        alert("Đặt hàng thành công!");
        // Thêm logic chuyển đến trang thanh toán hoặc xử lý đơn hàng ở đây
    });

    // Cập nhật tổng tiền và số lượng ban đầu khi trang tải
    updateTotalPrice();
});
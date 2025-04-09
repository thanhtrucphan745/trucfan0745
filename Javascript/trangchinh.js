document.getElementById("product-detail")

var giohang = []; // Mảng lưu trữ giỏ hàng

function themvaogiohang(x) {
    var productDetail = x.closest(".product-detail");
    var hinh = productDetail.querySelector("#MainImg").src;
    var gia = productDetail.querySelector(".new-price").innerText;
    var tensp = productDetail.querySelector(".product-name").innerText;
    var soluong = parseInt(productDetail.querySelector("input[type='number']").value) || 1;
    var mau = productDetail.querySelector(".product-colors li.active span").style.backgroundColor || "Không xác định";
     // Lưu giỏ hàng vào localStorage
     localStorage.setItem("giohang", JSON.stringify(giohang));
    console.log("Giỏ hàng hiện tại:", giohang);
    updateCartCount();

}
// Lấy giỏ hàng từ localStorage khi trang được tải lại
window.onload = function() {
    var savedCart = localStorage.getItem("giohang");

    if (savedCart) {
        giohang = JSON.parse(savedCart); // Khôi phục giỏ hàng từ localStorage
        console.log("Giỏ hàng đã được khôi phục:", giohang);
        updateCartCount();  // Cập nhật lại số lượng trên icon giỏ hàng
    }
};
// Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng
function updateCartCount() {
    var totalCount = giohang.reduce((total, item) => total + item[4], 0); // Tổng số lượng sản phẩm
    document.querySelector(".cart-count").innerText = totalCount;
}



document.getElementById("product-detail")

var giohang = []; // Mảng lưu trữ giỏ hàng

function themvaogiohang(x) {
    var productDetail = x.closest(".product-detail");
    var hinh = productDetail.querySelector("#MainImg").src;
    var gia = productDetail.querySelector(".new-price").innerText;
    var tensp = productDetail.querySelector(".product-name").innerText;
    var soluong = parseInt(productDetail.querySelector("input[type='number']").value) || 1;
    var mau = productDetail.querySelector(".product-colors li.active span").style.backgroundColor || "Không xác định";

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProduct = giohang.find(item => item[2] === tensp && item[3] === mau);
    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingProduct[4] += soluong;
    } else {
        // Nếu chưa, thêm sản phẩm mới
        var sp = [hinh, gia, tensp, mau, soluong];
        giohang.push(sp);
    }

     // Lưu giỏ hàng vào localStorage
     localStorage.setItem("giohang", JSON.stringify(giohang));


    console.log("Giỏ hàng hiện tại:", giohang);

    // Cập nhật số lượng trên icon giỏ hàng
    updateCartCount();

    // Hiển thị thông báo (nếu cần)
    // alert("Đã thêm vào giỏ hàng:\n" +
    //     "Tên sản phẩm: " + tensp + "\n" +
    //     "Giá: " + gia + "\n" +
    //     "Màu: " + mau + "\n" +
    //     "Số lượng: " + soluong);
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


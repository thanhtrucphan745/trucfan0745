window.onload = function () {
    const thongTinThanhToan = JSON.parse(localStorage.getItem("thongTinThanhToan"));

        if (!thongTinThanhToan || thongTinThanhToan.length === 0) {
        alert("Không có sản phẩm nào để thanh toán!");
        window.location.href = "gioHang.html";
        return;
    }

    const productList = document.getElementById("product-list");
    let tongTien = 0;
    let soLuongSanPham = 0;

       productList.innerHTML = "";

        thongTinThanhToan.forEach((sanPham) => {
        const donGia = parseFloat(sanPham[1].replace(/[^\d]/g, "")); 
        const thanhTien = donGia * sanPham[4]; 
        tongTien += thanhTien; 
        soLuongSanPham += parseInt(sanPham[4], 10); 

       
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${sanPham[0]}" alt="${sanPham[2]}" style="width: 100px; height: auto;">
                <br>
                ${sanPham[2]}
            </td>
            <td>
                <div style="width: 30px; height: 30px; background-color: ${sanPham[3]}; border: 2px solid #ddd;"></div>
            </td>
            <td>${sanPham[4]}</td>
            <td>${sanPham[1]}</td>
            <td>${thanhTien.toLocaleString()} VND</td>
        `;
        productList.appendChild(row);
    });

    const summary = document.querySelector(".summary table");
    summary.innerHTML = `
        <tr>
            <td>Tổng tiền (${soLuongSanPham} sản phẩm):</td>
            <td style="text-align: right;">${tongTien.toLocaleString()} VND</td>
        </tr>
        <tr>
            <td>Phí vận chuyển:</td>
            <td style="text-align: right;">0 VNĐ</td>
        </tr>
        <tr>
            <td><strong>Tổng thanh toán:</strong></td>
            <td style="text-align: right; font-weight: bold;">${tongTien.toLocaleString()} VND</td>
        </tr>
    `;
};

function showConfirmModal() {
    if (confirm('Bạn có chắc chắn muốn đặt hàng không?')) {
        alert('ĐẶT HÀNG THÀNH CÔNG');
        localStorage.removeItem("thongTinThanhToan");
        localStorage.removeItem("giohang");
        window.location.href = "Trangchu.html";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#order-btn').onclick = showConfirmModal;
});


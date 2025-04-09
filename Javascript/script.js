// Lấy các phần tử form
const loginForm = document.querySelector('.wrapper.login');
const registerForm = document.querySelector('.wrapper.register');
const infoForm = document.querySelector('.wrapper.info');
const switchToRegisterBtn = document.getElementById('switch-to-register');
const switchToLoginBtn = document.getElementById('switch-to-login');
const switchToInfoBtn = document.getElementById('switch-to-info');

// Chuyển sang form Đăng ký
switchToRegisterBtn.addEventListener('click', () => {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

// Chuyển sang form Đăng nhập
switchToLoginBtn.addEventListener('click', () => {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Chuyển sang form Thông tin
switchToInfoBtn.addEventListener('click', () => {
    registerForm.classList.remove('active');
    infoForm.classList.add('active');
});

// Xử lý sự kiện submit của form đăng nhập
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn form gửi yêu cầu mặc định

    let isValid = true;

    // Kiểm tra tài khoản
    isValid = isValid && validateUsername();

    // Kiểm tra mật khẩu
    isValid = isValid && validatePassword();

    // Nếu hợp lệ, chuyển đến trang chủ
    if (isValid) {
        window.location.href = "Trangchu.html"; // Chuyển hướng đến trang chủ
    }
});

// Hàm kiểm tra Tài khoản
function validateUsername() {
    const username = document.getElementById('username');
    if (!username.value.trim()) {
        username.classList.add('error'); // Thêm lớp "error" nếu lỗi
        return false;
    } else {
        username.classList.remove('error'); // Xóa lớp "error" nếu hợp lệ
        return true;
    }
}

// Hàm kiểm tra Mật khẩu
function validatePassword() {
    const password = document.getElementById('password');
    if (!password.value.trim() || password.value.length < 6) {
        password.classList.add('error'); // Thêm lớp "error" nếu lỗi
        return false;
    } else {
        password.classList.remove('error'); // Xóa lớp "error" nếu hợp lệ
        return true;
    }
}


// Hàm kiểm tra lỗi khi nhấn nút "Hoàn thành"
function validateForm() {
    let isValid = true; // Biến để kiểm tra xem form có hợp lệ không

    // Kiểm tra các trường dữ liệu
    isValid &= validateFullname();
    isValid &= validateEmail();
    isValid &= validateAddress();
    isValid &= validatePhone();

    // Nếu tất cả hợp lệ, chuyển trang
    if (isValid) {
        window.location.href = "Trangchu.html"; // Chuyển đến trang chủ
    }
}

// Hàm kiểm tra họ tên
function validateFullname() {
    const fullname = document.getElementById('fullname-info');

    if (!fullname.value.trim()) {
        fullname.classList.add('error');
        return false;
    } else {
        fullname.classList.remove('error');
        return true;
    }
}

// Hàm kiểm tra email
function validateEmail() {
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim()) {
        email.classList.add('error');
        return false;
    } else if (!emailPattern.test(email.value)) {
        email.classList.add('error');
        return false;
    } else {
        email.classList.remove('error');
        return true;
    }
}

// Hàm kiểm tra địa chỉ
function validateAddress() {
    const address = document.getElementById('address');

    if (!address.value.trim()) {
        address.classList.add('error');
        return false;
    } else {
        address.classList.remove('error');
        return true;
    }
}

// Hàm kiểm tra số điện thoại
function validatePhone() {
    const phone = document.getElementById('phone');
    const phonePattern = /^[0-9]{10,11}$/;

    if (!phone.value.trim()) {
        phone.classList.add('error');
        return false;
    } else if (!phonePattern.test(phone.value)) {
        phone.classList.add('error');
        return false;
    } else {
        phone.classList.remove('error');
        return true;
    }
}


// Hàm sắp xếp sản phẩm theo giá
function sortProducts() {
    const sortOrder = document.getElementById("sort-order").value; // Lấy giá trị từ dropdown sắp xếp
    const container = document.getElementById("product-container");
    const products = Array.from(container.getElementsByClassName("product-card")); // Chuyển NodeList thành Array

    // Sắp xếp sản phẩm theo data-price
    products.sort((a, b) => {
        const priceA = parseInt(a.getAttribute("data-price"));
        const priceB = parseInt(b.getAttribute("data-price"));

        // Sắp xếp tăng dần hoặc giảm dần
        return sortOrder === "low-to-high" ? priceA - priceB : priceB - priceA;
    });

    // Làm rỗng container và thêm sản phẩm đã sắp xếp
    container.innerHTML = "";
    products.forEach(product => container.appendChild(product));
}

// Hàm lọc sản phẩm theo giá
function filterProductsByPrice() {
    const selectedRange = document.getElementById("price-range").value;
    const container = document.getElementById("product-container");
    const products = Array.from(container.getElementsByClassName("product-card")); // Chuyển NodeList thành Array
    let minPrice = 0, maxPrice = 0;

    // Xác định phạm vi giá dựa trên lựa chọn của người dùng
    switch (selectedRange) {
        case '10-12':
            minPrice = 10000000;
            maxPrice = 12000000;
            break;
        case '12-14':
            minPrice = 12000000;
            maxPrice = 14000000;
            break;
        case '14-17':
            minPrice = 14000000;
            maxPrice = 17000000;
            break;
        case '17-20':
            minPrice = 17000000;
            maxPrice = 20000000;
            break;
        case '20-25':
            minPrice = 20000000;
            maxPrice = 25000000;
            break;
        case '25-30':
            minPrice = 25000000;
            maxPrice = 30000000;
            break;
        case '30-40':
            minPrice = 30000000;
            maxPrice = 40000000;
            break;
        case '40-50':
            minPrice = 40000000;
            maxPrice = 50000000;
            break;
        case '50-60':
            minPrice = 50000000;
            maxPrice = 60000000;
            break;

        default:
            break;
    }

    // Hiển thị hoặc ẩn các sản phẩm dựa trên phạm vi giá
    products.forEach(product => {
        const price = parseInt(product.getAttribute('data-price'));
        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block'; // Hiển thị sản phẩm
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm
        }
    });

    // Sau khi lọc, gọi lại hàm sắp xếp để đảm bảo các sản phẩm được sắp xếp theo yêu cầu
    sortProducts();
}



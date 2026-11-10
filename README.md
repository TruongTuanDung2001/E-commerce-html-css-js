Project E-commerce use HTML-CSS Javascript by Truong Tuan Dung

******* CÁC TRANG CƠ BẢN V 1.0 *******
Trang chủ (Home)
Banner · Sản phẩm nổi bật · Danh mục

Trang sản phẩm (Shop)
Danh sách · Tìm kiếm · Lọc · Sắp xếp

Chi tiết sản phẩm (Product Detail)
Hình ảnh · Giá · Mô tả · Số lượng

Giỏ hàng (Cart)
Thêm · Xóa · Cập nhật số lượng

Thanh toán (Checkout)
Thông tin khách hàng · Địa chỉ · Đơn hàng

Đặt hàng thành công (Order Success)



******* CHỨC NĂNG PROJECT *******
Render Products	Hiển thị sản phẩm từ dữ liệu
Search	Tìm kiếm theo tên
Filter	Lọc theo danh mục, giá
Sort	Sắp xếp sản phẩm
Product Detail	Lấy sản phẩm theo ID
Add to Cart	Thêm vào giỏ hàng
Update Quantity	Thay đổi số lượng
Remove Product	Xóa sản phẩm
Calculate Total	Tính tổng tiền
LocalStorage	Lưu giỏ hàng
Wishlist	Quản lý yêu thích
Form Validation	Kiểm tra dữ liệu
Checkout	Xử lý đặt hàng demo
Responsive Menu	Menu trên mobile


- Render sản phẩm từ JavaScript.
- Tìm kiếm sản phẩm.
- Lọc và sắp xếp.
- Thêm, xóa sản phẩm trong giỏ.
- Tính tổng tiền.
- Lưu dữ liệu bằng LocalStorage.


- Product Detail theo ID.
- Wishlist.
- Pagination.
- Coupon / Discount.
- Form Validation.
- Quản lý trạng thái đăng nhập demo.
- Quản lý đơn hàng demo.


- Sử dụng API để lấy dữ liệu sản phẩm.
- Đăng nhập và đăng ký với backend.
- Đồng bộ giỏ hàng với server.
- Phân quyền người dùng.
- Admin Dashboard quản lý sản phẩm.
- Quản lý đơn hàng.


******* CẤU TRÚC THƯ MỤC *******
  ecommerce-website/
│
├── index.html
├── shop.html
├── product-detail.html
├── cart.html
├── checkout.html
├── order-success.html
├── login.html
├── register.html
├── wishlist.html
├── about.html
├── contact.html
│
├── assets/
│   ├── images/
│   │   ├── products/
│   │   ├── banners/
│   │   └── icons/
│   └── fonts/
│
├── css/
│   ├── reset.css
│   ├── global.css
│   ├── header.css
│   ├── footer.css
│   ├── home.css
│   ├── shop.css
│   ├── product.css
│   ├── cart.css
│   ├── checkout.css
│   └── responsive.css
│
└── js/
    ├── data/
    │   └── products.js
    │
    ├── components/
    │   ├── header.js
    │   ├── footer.js
    │   └── productCard.js
    │
    ├── utils/
    │   ├── storage.js
    │   └── formatCurrency.js
    │
    ├── pages/
    │   ├── home.js
    │   ├── shop.js
    │   ├── productDetail.js
    │   ├── cart.js
    │   ├── checkout.js
    │   ├── login.js
    │   └── wishlist.js
    │
    └── main.js



******* GIAI ĐOẠN, HƯỚNG ĐI *******
1	Phân tích UI/UX, thiết kế layout	Wireframe
2	HTML Header, Footer, Home	Trang chủ
3	CSS Grid, Flexbox, Responsive	Giao diện hoàn chỉnh
4	Tạo dữ liệu sản phẩm	Product data
5	Render sản phẩm bằng JS	Shop
6	Search, Filter, Sort	Chức năng tìm kiếm
7	Product Detail	Trang chi tiết
8	Cart + LocalStorage	Giỏ hàng
9	Checkout + Validation	Đặt hàng demo
10	Wishlist + Login	Tài khoản
11	Testing, Debugging	Hoàn thiện
12	GitHub + Deploy	Portfolio

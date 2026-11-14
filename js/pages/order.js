
const customerNameEl = document.getElementById("customerName");
const orderIdEl = document.getElementById("orderId");

// Lấy danh sách đơn hàng
const orders = JSON.parse(localStorage.getItem("orders")) || [];

// Lấy đơn hàng mới nhất
const latestOrder = orders.length > 0
    ? orders[orders.length - 1]
    : null;

if (latestOrder) {
    // Lấy tên khách hàng
    const customerName =
        latestOrder.customer?.fullName ||
        latestOrder.customer?.name ||
        "bạn";

    customerNameEl.textContent = customerName;

    // Hiển thị mã đơn hàng
    const orderId =
        latestOrder.id ||
        latestOrder.orderId ||
        `PET-${new Date(latestOrder.createdAt || Date.now())
            .getTime()
            .toString()
            .slice(-6)}`;

    orderIdEl.textContent = `#${orderId}`;
} else {
    // Trường hợp truy cập trực tiếp trang Success
    customerNameEl.textContent = "bạn";
    orderIdEl.textContent = "Chưa có đơn hàng";
}

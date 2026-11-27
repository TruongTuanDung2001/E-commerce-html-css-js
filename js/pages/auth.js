import {getUsers} from "../services/userService.js";
// const USER_API = "http://localhost:3001/users";

let allUser = [];

// DOM
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const showRegisterBtn = document.querySelector("#showRegister");
const showLoginBtn = document.querySelector("#showLogin");

const authTitle = document.querySelector("#authTitle");
const authDescription = document.querySelector("#authDescription");

// Switch Login / Register
showRegisterBtn.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    authTitle.textContent = "Create account";
    authDescription.textContent =
        "Join our pet lovers community today.";
});

showLoginBtn.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

    authTitle.textContent = "Welcome back!";
    authDescription.textContent =
        "Login to continue your pet shopping journey.";
});

// Show / Hide Password
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);
        const icon = button.querySelector("i");

        const isPassword = target.type === "password";

        target.type = isPassword ? "text" : "password";

        icon.classList.toggle("fa-eye", !isPassword);
        icon.classList.toggle("fa-eye-slash", isPassword);
    });
});

// Message
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
}

// LOGIN
// loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#loginEmail")
//         .value.trim().toLowerCase();

//     const password = document.querySelector("#loginPassword").value;

//     const message = document.querySelector("#loginMessage");

//     try {
//         const response = await fetch(
//             `${USER_API}?email=${encodeURIComponent(email)}`
//         );

//         if (!response.ok) {
//             throw new Error("Cannot connect to Users API");
//         }

//         const users = await response.json();

//         const user = users.find(item =>
//             item.password === password
//         );

//         if (!user) {
//             showMessage(
//                 message,
//                 "Email or password is incorrect!",
//                 "error"
//             );
//             return;
//         }

//         if (user.status === "inactive") {
//             showMessage(
//                 message,
//                 "Your account has been disabled.",
//                 "error"
//             );
//             return;
//         }

//         // Không lưu password vào trình duyệt
//         const currentUser = {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             avatar: user.avatar
//         };

//         const rememberMe =
//             document.querySelector("#rememberMe").checked;

//         const storage = rememberMe ? localStorage : sessionStorage;

//         // Xóa session cũ trước khi lưu phiên mới
//         localStorage.removeItem("currentUser");
//         sessionStorage.removeItem("currentUser");

//         storage.setItem(
//             "currentUser",
//             JSON.stringify(currentUser)
//         );

//         showMessage(message, "Login successful!", "success");

//         setTimeout(() => {
//             if (user.role === "admin") {
//                 window.location.href = "../pages/admin/dashboard.html";
//             } else {
//                 window.location.href = "../index.html";
//             }
//         }, 700);

//     } catch (error) {
//         console.error(error);

//         showMessage(
//             message,
//             "Unable to connect to the server!",
//             "error"
//         );
//     }
// });

// REGISTER
// registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.querySelector("#registerName")
//         .value.trim();

//     const email = document.querySelector("#registerEmail")
//         .value.trim().toLowerCase();

//     const password = document.querySelector("#registerPassword").value;

//     const confirmPassword =
//         document.querySelector("#confirmPassword").value;

//     const message = document.querySelector("#registerMessage");

//     if (password.length < 6) {
//         showMessage(
//             message,
//             "Password must contain at least 6 characters.",
//             "error"
//         );
//         return;
//     }

//     if (password !== confirmPassword) {
//         showMessage(
//             message,
//             "Passwords do not match!",
//             "error"
//         );
//         return;
//     }

//     try {
//         // Kiểm tra email đã tồn tại chưa
//         const checkResponse = await fetch(
//             `${USER_API}?email=${encodeURIComponent(email)}`
//         );

//         if (!checkResponse.ok) {
//             throw new Error("Cannot check email");
//         }

//         const existingUsers = await checkResponse.json();

//         if (existingUsers.length > 0) {
//             showMessage(
//                 message,
//                 "This email is already registered!",
//                 "error"
//             );
//             return;
//         }

//         // Tạo User mới
//         const newUser = {
//             name,
//             email,
//             password,
//             role: "user",
//             avatar: "",
//             cart: [],
//             wishlist: []
//         };

//         const response = await fetch(USER_API, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         });

//         if (!response.ok) {
//             throw new Error("Registration failed");
//         }

//         showMessage(
//             message,
//             "Registration successful! Please login.",
//             "success"
//         );

//         registerForm.reset();

//         setTimeout(() => {
//             showLoginBtn.click();

//             document.querySelector("#loginEmail").value = email;
//         }, 1000);

//     } catch (error) {
//         console.error(error);

//         showMessage(
//             message,
//             "Unable to register. Please try again.",
//             "error"
//         );
//     }
// });

initAuth();
//init auth
async function initAuth(){
    allUser = await getUsers();

    login();
}

// 
function login(){
    const loginEmail = document.getElementById("loginEmail");

    const loginPassword = document.getElementById("loginPassword");

    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        console.log(allUser);
        
        
    })
}

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("formRegister");
    const loginForm = document.getElementById("formLogin");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            registerUser();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            loginUser();
        });
    }
});

// Función para registrar un usuario
function registerUser() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("registerPhone").value;
    const address = document.getElementById("registerAddress").value;
    const password = document.getElementById("registerPass").value;
    const confirmPassword = document.getElementById("registerConfirmPass").value;

    // Validar que todos los campos estén completos
    if (!name || !email || !phone || !address || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validar formato de correo
    if (!validateEmail(email)) {
        alert("Ingresa un correo válido.");
        return;
    }

    // Validar formato de teléfono (solo números)
    if (!validatePhone(phone)) {
        alert("Ingresa un teléfono válido (solo números).");
        return;
    }

    // Obtener usuarios registrados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        alert("El correo ya está registrado. Prueba con otro.");
        return;
    }

    // Crear el objeto de usuario
    const user = {
        name,
        email,
        phone,
        address,
        password,
    };

    // Guardar el usuario en localStorage
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    // Mostrar el formulario de Iniciar Sesión después del registro
    toggleForm();
}

// Función para iniciar sesión
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPass").value;

    // Validar que los campos estén completos
    if (!email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Obtener usuarios registrados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario por correo y contraseña
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "index.html"; // Redirigir al catálogo
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

// Función para alternar entre los formularios de Login y Registro
function toggleForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Función para validar el formato de correo
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar el formato de teléfono (solo números)
function validatePhone(phone) {
    const regex = /^\d+$/;
    return regex.test(phone);
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Función para verificar la sesión
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem("loggedInUser");
    if (!usuarioLogueado) {
        alert("Debe iniciar sesión para acceder a esta página.");
        window.location.href = "login.html";
    }
}
function login() {
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value;

    if (email === "" || pass === "") {
        showToast("Please fill all fields!");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify({ email, role }));

    if (role === "admin") {
        location.href = "admin.html";
    } else {
        location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.href = "login.html";
}

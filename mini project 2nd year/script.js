let eventsContainer = null;

window.addEventListener("DOMContentLoaded", () => {
    eventsContainer = document.getElementById("events-container");
    loadEvents();
});

function loadEvents() {
    showSkeletons(eventsContainer);
    setTimeout(() => renderEvents(getEvents()), 600);
}

function renderEvents(list) {
    eventsContainer.innerHTML = "";

    let favs = getFavorites();

    list.forEach(ev => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${ev.title}</h3>
            <p><b>${ev.category}</b></p>
            <p>${ev.date}</p>
            <p>${ev.location}</p>
            <p>${ev.seats} seats left</p>

            <button onclick="registerEvent(${ev.id})">Register</button>
            <button onclick="toggleFav(${ev.id})">${favs.includes(ev.id) ? "★" : "☆"}</button>
        `;

        eventsContainer.appendChild(card);
    });
}

function searchEvents(q) {
    let all = getEvents();
    q = q.toLowerCase();
    renderEvents(all.filter(e => e.title.toLowerCase().includes(q)));
}

function filterByCategory(cat) {
    let chips = document.querySelectorAll(".chip");
    chips.forEach(c => c.classList.remove("active"));

    event.target.classList.add("active");

    let all = getEvents();
    if (cat === "all") {
        renderEvents(all);
        return;
    }

    renderEvents(all.filter(e => e.category === cat));
}

function registerEvent(id) {
    let events = getEvents();
    let ev = events.find(e => e.id === id);

    if (ev.seats <= 0) {
        showToast("No seats left!");
        return;
    }

    ev.seats--;
    saveEvents(events);

    showToast("Registered successfully!");
    loadEvents();

    let user = JSON.parse(localStorage.getItem("loggedUser"));
    let newTicket = createTicket(id, user.email);

    showToast("Ticket generated!");
}

function toggleFav(id) {
    toggleFavorite(id);
    loadEvents();
}

window.onload = function() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return alert("No user logged in!");

    document.getElementById("profile-name").value = user.name || "";
    document.getElementById("profile-email").value = user.email || "";
    document.getElementById("profile-avatar").src = user.avatar || "assets/default-avatar.png";
}

function updateAvatar() {
    const file = document.getElementById("avatar-input").files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("profile-avatar").src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function saveProfile() {
    const name = document.getElementById("profile-name").value.trim();
    const email = document.getElementById("profile-email").value.trim();
    const avatar = document.getElementById("profile-avatar").src;

    if (!name || !email) {
        alert("Please fill in your name.");
        return;
    }

    let user = JSON.parse(localStorage.getItem("loggedUser")) || {};
    user.name = name;
    user.email = email;
    user.avatar = avatar;

    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("Profile saved successfully!");
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.href = "login.html";
}

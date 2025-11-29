let adminGrid = null;

window.addEventListener("DOMContentLoaded", () => {
    adminGrid = document.getElementById("admin-events");
    loadAdminEvents();
});

function loadAdminEvents() {
    showSkeletons(adminGrid);
    setTimeout(() => renderAdmin(getEvents()), 500);
}

function renderAdmin(list) {
    adminGrid.innerHTML = "";
    list.forEach(ev => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${ev.title}</h3>
            <p>${ev.category}</p>
            <p>${ev.date}</p>
            <p>${ev.location}</p>
            <p>${ev.seats} seats</p>

            <button onclick="editEvent(${ev.id})">Edit</button>
            <button onclick="removeEvent(${ev.id})">Delete</button>
        `;
        adminGrid.appendChild(card);
    });
}

function removeEvent(id) {
    deleteEvent(id);
    showToast("Event removed!");
    loadAdminEvents();
}

function openAddModal() {
    let title = prompt("Title?");
    let cat = prompt("Category?");
    let date = prompt("YYYY-MM-DD?");
    let loc = prompt("Location?");
    let desc = prompt("Description?");
    let seats = parseInt(prompt("Seats?"));

    addEvent({
        id: Date.now(),
        title,
        category: cat,
        date,
        location: loc,
        description: desc,
        seats,
        img: ""
    });

    showToast("Event added!");
    loadAdminEvents();
}

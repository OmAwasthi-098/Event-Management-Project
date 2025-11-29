window.onload = loadMyEvents;

function loadMyEvents() {
    const container = document.getElementById("my-events-container");
    container.innerHTML = "";

    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        container.innerHTML = "<p>Please login to view your events.</p>";
        return;
    }

    const tickets = getTickets().filter(t => t.userEmail === user.email);
    const allEvents = getEvents();

    if (tickets.length === 0) {
        container.innerHTML = "<p>You have not registered for any events yet.</p>";
        return;
    }

    tickets.forEach(ticket => {
        const ev = allEvents.find(e => e.id === ticket.eventId);
        if (!ev) return;

        const card = document.createElement("div");
        card.className = "card";

        const eventDate = new Date(ev.date);
        const now = new Date();
        let countdown = "";
        if (eventDate > now) {
            const diff = eventDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            countdown = `<p>⏱ ${days} day(s) remaining</p>`;
        } else {
            countdown = `<p>✅ Event Completed</p>`;
        }

        card.innerHTML = `
            <h3>${ev.title}</h3>
            <p><b>Category:</b> ${ev.category}</p>
            <p><b>Date:</b> ${ev.date}</p>
            <p><b>Location:</b> ${ev.location}</p>
            ${countdown}
            <p><b>Ticket ID:</b> ${ticket.ticketId}</p>
            <p>Status: ${ticket.used ? "✔ Used" : "🟢 Active"}</p>
            <button type="button" onclick="viewTicket('${ticket.ticketId}')">View Ticket</button>
        `;

        container.appendChild(card);
    });
}

function viewTicket(ticketId) {
    localStorage.setItem("viewTicketId", ticketId);
    location.href = "tickets.html";
}

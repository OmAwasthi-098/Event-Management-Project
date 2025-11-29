if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify([
        {
            id: 1,
            title: "Music Fiesta",
            category: "Music",
            date: "2025-12-20",
            location: "City Hall",
            description: "A night full of live music performances.",
            seats: 50,
            img: "",
        },
        {
            id: 2,
            title: "Tech Summit",
            category: "Tech",
            date: "2025-12-05",
            location: "Tech Park",
            description: "A gathering of top innovators and developers.",
            seats: 80,
            img: "",
        }
    ]));
}

function getEvents() {
    return JSON.parse(localStorage.getItem("events"));
}

function saveEvents(ev) {
    localStorage.setItem("events", JSON.stringify(ev));
}

function addEvent(eventObj) {
    let events = getEvents();
    events.push(eventObj);
    saveEvents(events);
}

function deleteEvent(id) {
    let events = getEvents().filter(e => e.id !== id);
    saveEvents(events);
}

function updateEvent(updated) {
    let events = getEvents().map(e => e.id === updated.id ? updated : e);
    saveEvents(events);
}

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
}

function getTickets() {
    return JSON.parse(localStorage.getItem("tickets") || "[]");
}

function saveTickets(t) {
    localStorage.setItem("tickets", JSON.stringify(t));
}

function createTicket(eventId, userEmail) {
    let tickets = getTickets();

    let ticket = {
        ticketId: "T" + Date.now(),
        eventId,
        userEmail,
        used: false,
        createdAt: new Date().toISOString()
    };

    tickets.push(ticket);
    saveTickets(tickets);

    return ticket;
}

function markTicketUsed(ticketId) {
    let tickets = getTickets();
    tickets = tickets.map(t =>
        t.ticketId === ticketId ? { ...t, used: true } : t
    );
    saveTickets(tickets);
}

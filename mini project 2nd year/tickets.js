window.onload = loadTickets;

function loadTickets() {
    let tickets = getTickets();
    let events = getEvents();
    let list = document.getElementById("ticket-list");

    if (tickets.length === 0) {
        list.innerHTML = "<p>No tickets yet.</p>";
        return;
    }

    tickets.forEach(t => {
        let ev = events.find(e => e.id === t.eventId);

        let card = document.createElement("div");
        card.className = "card";
        
        let qrId = "qr_" + t.ticketId;

        card.innerHTML = `
            <h3>${ev.title}</h3>
            <p>${ev.date}</p>
            <p>${ev.location}</p>
            <p><b>Ticket ID:</b> ${t.ticketId}</p>
            <p>Status: ${t.used ? "✔ Used" : "🟢 Active"}</p>
            <div id="${qrId}" style="margin:10px auto;width:140px;"></div>
            <button onclick="downloadQR('${qrId}', '${t.ticketId}')">
                Download QR
            </button>
        `;

        list.appendChild(card);

        new QRCode(document.getElementById(qrId), {
            text: t.ticketId,
            width: 120,
            height: 120
        });
    });
}

function downloadQR(divId, filename) {
    let canvas = document.querySelector(`#${divId} canvas`);
    let link = document.createElement("a");
    link.download = filename + ".png";
    link.href = canvas.toDataURL();
    link.click();
}
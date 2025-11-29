const video = document.getElementById("camera");
const resultText = document.getElementById("result-text");

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
.then(stream => video.srcObject = stream);

setInterval(scanFrame, 800);

function scanFrame() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    try {
        let code = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                        canvas.width, canvas.height);
        
        if (code) validateTicket(code.data);
    } catch {}
}

function validateTicket(ticketId) {
    let tickets = getTickets();
    let t = tickets.find(t => t.ticketId === ticketId);

    if (!t) {
        resultText.innerHTML = "INVALID OR FAKE TICKET!";
        return;
    }

    if (t.used) {
        resultText.innerHTML = "Ticket Already Used!";
        return;
    }

    markTicketUsed(ticketId);
    resultText.innerHTML = "Ticket Verified. Entry Allowed!";
}

window.addEventListener("DOMContentLoaded", () => buildCalendar());

function buildCalendar() {
    let cal = document.getElementById("calendar");
    let events = getEvents();

    let days = 30;

    for (let d = 1; d <= days; d++) {
        let cell = document.createElement("div");
        cell.className = "card";
        cell.innerHTML = `<h3>${d}</h3>`;

        let todayEvents = events.filter(e => parseInt(e.date.split("-")[2]) === d);
        todayEvents.forEach(ev => {
            cell.innerHTML += `<p>${ev.title}</p>`;
        });

        cal.appendChild(cell);
    }
}

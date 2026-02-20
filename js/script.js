document.addEventListener("DOMContentLoaded", function () {

    const loader = document.querySelector(".loader");
    const rocket = document.querySelector(".rocket-container");

    if (loader && rocket) {

        setTimeout(() => {
            rocket.classList.add("launch");
        }, 800);

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 2200);

    }

});

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("missions-container");

    if (!container) return;

    container.innerHTML = "";

    missionsData.forEach(mission => {

        const card = document.createElement("div");
        card.classList.add("mission-card");

        card.innerHTML = `
            <h2>${mission.name}</h2>
            <span class="mission-type">${mission.type}</span>
            <p><strong>Launch Date:</strong> ${mission.launchDate}</p>
            <p><strong>Rocket:</strong> ${mission.rocket}</p>
            <p><strong>Status:</strong> ${mission.status}</p>
        `;

        card.addEventListener("click", function () {
            window.location.href = `mission.html?id=${mission.id}`;
        });

        container.appendChild(card);
    });

});

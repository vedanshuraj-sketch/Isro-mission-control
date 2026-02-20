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

    const missions = [
        {
            name: "Chandrayaan-3",
            launchDate: "14 July 2023",
            rocket: "LVM3",
            status: "Successful",
            type: "Lunar Mission",
            description: "Indias third lunar exploration mission that achieved successful soft landing near Moon's south pole."
        },
        {
            name: "Mars Orbiter Mission",
            launchDate: "5 November 2013",
            rocket: "PSLV-C25",
            status: "Completed",
            type: "Mars Mission",
            description: "Indias first interplanetary mission that successfully reached Mars orbit on first attempt."
        },
        {
            name: "Aditya-L1",
            launchDate: "2 September 2023",
            rocket: "PSLV-C57",
            status: "Active",
            type: "Solar Mission",
            description: "Indias first dedicated solar mission to study the Sun from Lagrange Point L1."
        }
    ];

    const container = document.getElementById("missions-container");
    const modal = document.getElementById("missionModal");
    const closeBtn = document.querySelector(".close-btn");

    const modalTitle = document.getElementById("modalTitle");
    const modalLaunch = document.getElementById("modalLaunch");
    const modalRocket = document.getElementById("modalRocket");
    const modalStatus = document.getElementById("modalStatus");
    const modalDescription = document.getElementById("modalDescription");

    function renderMissions() {
        container.innerHTML = "";

        missions.forEach(mission => {
            const card = document.createElement("div");
            card.classList.add("mission-card");

            card.innerHTML = `
                <h2>${mission.name}</h2>
                <span class="mission-type">${mission.type}</span>
                <p><strong>Launch Date:</strong> ${mission.launchDate}</p>
                <p><strong>Rocket:</strong> ${mission.rocket}</p>
                <p class="status"><strong>Status:</strong> ${mission.status}</p>
            `;

            card.addEventListener("click", function () {
                window.location.href = `mission.html?id=${mission.id}`;
            });

            container.appendChild(card);
        });
    }

    if (container) {
        renderMissions();
    }

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

});
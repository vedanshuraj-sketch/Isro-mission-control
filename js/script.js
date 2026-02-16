window.addEventListener("load", function () {
    const rocket = this.document.querySelector(".rocket-container");
    const loader = this.document.querySelector(".loader");

    this.setTimeout(() => {
        rocket.classList.add("launch");

        const burst = this.document.createElement("div");
        burst.classList.add("light-burst");
        rocket.appendChild(burst);
    }, 800);

    this.setTimeout(() => {
        loader.classList.add("hidden");
    }, 2200);
});

document.addEventListener("DOMContentLoaded", function () {

    const mission = [{
        name: "Chandrayaan-3",
        launchDate: "14 july 2023",
        rocket: "LVM3",
        status: "Successful",
        type: "Lunar Mission"
    },
    {
        name: "Mars Orbiter Mission",
        launchDate: "5 November 2013",
        rocket: "PSLV-C25",
        status: "Completed",
        type: "Mars Mission"
    },
    {
        name: "Aditya-L1",
        launchDate: "2 September 2023",
        rocket: "PSLV-C57",
        status: "Active",
        type: "Solar Mission"
    }
    ];

    const container = document.getElementById("mission-container");

    if (container) {
        mission.forEach(mission => {

            const card = document.createElement("div");
            card.classList.add("mission-card");

            card.innerHTML = `
            <h2>${mission.name}</h2>
            <span class="mission-type">${mission.type}</span>
            <p><strong>Rocket:</strong> ${mission.rocket}</p>
            <p class="status"><strong>Status:</strong>${mission.status}</p>
            `;

            container.appendChild(card);
        });
    }
});
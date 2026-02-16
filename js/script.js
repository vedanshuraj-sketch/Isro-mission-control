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

    const container = document.getElementById("missions-container");
    const filter = document.getElementById("missionFilter");

    // ONLY run mission code if container exists
    if (container) {

        function renderMissions(list) {
            container.innerHTML = "";

            list.forEach(mission => {
                const card = document.createElement("div");
                card.className = "mission-card";

                card.innerHTML = `
                    <h2>${mission.name}</h2>
                    <span class="mission-type">${mission.type}</span>
                    <p><strong>Launch Date:</strong> ${mission.launchDate}</p>
                    <p><strong>Rocket:</strong> ${mission.rocket}</p>
                    <p class="status"><strong>Status:</strong> ${mission.status}</p>
                `;

                container.appendChild(card);
            });
        }

        renderMissions(missions);

        if (filter) {
            filter.addEventListener("change", function () {
                const selected = this.value;

                if (selected === "all") {
                    renderMissions(missions);
                } else {
                    const filtered = missions.filter(m => m.type === selected);
                    renderMissions(filtered);
                }
            });
        }
    }

});
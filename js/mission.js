document.addEventListener("DOMContentLoaded", function() {

    const params = new URLSearchParams(window.location.search);
    const missionId = params.get("id");

    const mission = missionsData.find(m => m.id === missionId);

    if (!mission) return;

    document.getElementById("missionTitle").textContent = mission.name;
    document.getElementById("missionType").textContent = mission.type;
    document.getElementById("missionLaunch").textContent = mission.launchDate;
    document.getElementById("missionRocket").textContent = mission.rocket;
    document.getElementById("missionStatus").textContent = mission.status;
    document.getElementById("missionDescription").textContent = mission.description;

    const timelineContainer = document.getElementById("timelineContainer");

    mission.timeline.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("timeline-item");
        div.innerHTML = `
            <h3>${item.event}</h3>
            <p>${item.date}</p>
        `;
        timelineContainer.appendChild(div);
    });

    // ✅ NOW create observer AFTER items exist

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".timeline-item").forEach(item => {
        observer.observe(item);
    });

});

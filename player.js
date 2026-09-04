const playerForm = document.getElementById("playerForm");

if (playerForm) {
    playerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const get = id => document.getElementById(id)?.value.trim();
        const player = {
            name: get("playerName"),
            position: get("playerPosition"),
            preferredFoot: get("preferredFoot"),
            age: Number(get("playerAge")),
            nationality: get("playerNationality"),
            startingClub: get("startingClub"),
            overall: Number(get("playerOverall")) || 65,
            value: Number(get("playerValue")) || 500000,
            salary: Number(get("playerSalary")) || 10000,
            goals: 0,
            assists: 0,
            appearances: 0,
            trophies: 0,
            fanRating: 50,
            popularity: 50,
            fitness: 90,
            sharpness: 70,
            fatigue: 10,
            season: "2026/27",
            attributes: {
                pace: Number(get("playerOverall")) || 65,
                shooting: Number(get("playerOverall")) || 65,
                passing: Number(get("playerOverall")) || 65,
                dribbling: Number(get("playerOverall")) || 65,
                defending: Number(get("playerOverall")) || 65,
                physical: Number(get("playerOverall")) || 65,
                mental: Number(get("playerOverall")) || 65,
                weakfoot: 50
            }
        };

        if (!player.name || !player.position || !player.preferredFoot || !player.age || !player.nationality || !player.startingClub) {
            alert("لطفاً تمام اطلاعات بازیکن را کامل کن.");
            return;
        }

        localStorage.setItem("careerPlayer", JSON.stringify(player));
        localStorage.setItem("careerStarted", "true");
        alert(`بازیکن ${player.name} با موفقیت ساخته شد! ⚽`);
        window.location.href = "career.html";
    });
}

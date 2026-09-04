document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    const get = id => document.getElementById(id);
    const num = (id, fallback) => Number(get(id)?.value) || fallback;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = get("playerName")?.value.trim();
        if (!name) {
            alert("لطفاً نام بازیکن را وارد کنید.");
            return;
        }

        const startingClub = get("startingClub")?.value.trim() || "باشگاه آزاد";
        const overall = Math.max(1, Math.min(99, num("playerOverall", 65)));
        const age = Math.max(16, Math.min(40, num("age", 18)));

        const player = {
            name,
            position: get("position")?.value || "ST",
            preferredFoot: get("preferredFoot")?.value || "right",
            age,
            nationality: get("nationality")?.value.trim() || "ایران",
            startingClub,
            club: startingClub,
            overall,
            potential: Math.min(99, overall + Math.max(3, 23 - age)),
            value: Math.max(0, num("playerValue", 500000)),
            salary: Math.max(0, num("playerSalary", 10000)),
            goals: 0,
            assists: 0,
            appearances: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            trophies: 0,
            fanRating: 50,
            popularity: 50,
            fitness: 90,
            sharpness: 70,
            fatigue: 10,
            contractYears: 3,
            season: "2026/27",
            matchHistory: [],
            transferHistory: [],
            trophyHistory: [],
            attributes: {
                pace: 65, shooting: 60, passing: 62, dribbling: 64,
                defending: 45, physical: 60, stamina: 65, strength: 55,
                vision: 60, finishing: 58, ballControl: 65, tackling: 40,
                interceptions: 38, composure: 55, reactions: 60,
                weakFoot: 3, skillMoves: 3
            }
        };

        localStorage.setItem("careerPlayer", JSON.stringify(player));
        localStorage.setItem("careerStarted", "true");
        window.location.href = "career.html";
    });
});

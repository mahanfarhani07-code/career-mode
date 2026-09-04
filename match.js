document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("playMatchBtn");
    const resultBox = document.getElementById("matchResult");
    const raw = localStorage.getItem("careerPlayer");
    let player;
    try { player = JSON.parse(raw); } catch { player = null; }
    if (!player) {
        if (resultBox) resultBox.innerHTML = "⚠️ ابتدا بازیکن خود را بسازید.";
        return;
    }

    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, Number(v) || 0));

    if (btn) btn.addEventListener("click", () => {
        btn.disabled = true;
        const overall = Number(player.overall) || 65;
        const fitness = Number(player.fitness ?? 85);
        const sharpness = Number(player.sharpness ?? 70);
        const opponent = Math.floor(Math.random() * 21) + 60;
        const strength = overall * 0.65 + fitness * 0.2 + sharpness * 0.15;
        const opponentStrength = opponent;
        const roll = Math.random() * 25 - 12;
        const diff = strength - opponentStrength + roll;
        const teamGoals = clamp(Math.round(1.4 + diff / 16 + (Math.random() * 2 - 1)), 0, 5);
        const opponentGoals = clamp(Math.round(1.3 - diff / 18 + (Math.random() * 2 - 1)), 0, 5);

        let type = teamGoals > opponentGoals ? "win" : teamGoals < opponentGoals ? "loss" : "draw";
        const rating = clamp((6.4 + diff / 12 + Math.random() * 1.4).toFixed(1), 4, 10);
        const position = player.position || "ATT";
        const goalChance = position === "ATT" ? 0.52 : position === "MID" ? 0.28 : 0.12;
        const goals = Math.min(teamGoals, Math.random() < goalChance ? 1 + (Math.random() < 0.15 ? 1 : 0) : 0);
        const assists = Math.min(Math.max(teamGoals - goals, 0), Math.random() < (position === "MID" ? 0.5 : 0.25) ? 1 : 0);

        player.appearances = (player.appearances || 0) + 1;
        player.goals = (player.goals || 0) + goals;
        player.assists = (player.assists || 0) + assists;
        player.fatigue = clamp((player.fatigue || 0) + 14);
        player.fitness = clamp((player.fitness || 85) - 6);
        player.sharpness = clamp((player.sharpness || 70) + (rating >= 7 ? 3 : 1));
        player.fanRating = clamp((player.fanRating ?? player.popularity ?? 50) + (type === "win" ? 4 : type === "draw" ? 1 : -3) + (rating >= 8 ? 2 : 0));
        player.popularity = player.fanRating;
        localStorage.setItem("careerPlayer", JSON.stringify(player));

        set("resultText", `${type === "win" ? "برد" : type === "loss" ? "باخت" : "مساوی"} ${teamGoals} - ${opponentGoals}`);
        set("matchGoals", goals);
        set("matchAssists", assists);
        set("matchRating", rating);
        set("matchFans", `${Math.round(player.fanRating)}%`);
        const progress = document.getElementById("matchProgress");
        if (progress) progress.style.width = `${player.fanRating}%`;
        if (resultBox) resultBox.style.display = "block";
        btn.disabled = false;
        btn.textContent = "▶ مسابقه بعدی";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let btn = document.getElementById("playMatchBtn");
    const resultBox = document.getElementById("matchResult");
    const raw = localStorage.getItem("careerPlayer");
    let player;
    try { player = JSON.parse(raw); } catch { player = null; }

    if (!player) {
        if (resultBox) { resultBox.style.display = "block"; resultBox.innerHTML = "⚠️ ابتدا بازیکن خود را بسازید."; }
        return;
    }

    if (!btn) {
        const actions = document.querySelector(".form-actions") || document.querySelector("main");
        if (actions) {
            btn = document.createElement("button"); btn.id = "playMatchBtn"; btn.type = "button";
            btn.textContent = "▶ شروع مسابقه"; actions.insertBefore(btn, actions.firstChild);
        }
    }

    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, Number(v) || 0));
    const attrs = player.attributes || {};
    const getAttr = (name, fallback = 60) => clamp(attrs[name] ?? fallback, 1, 99);

    const calculatePerformance = () => {
        const position = player.position || "ST";
        const overall = Number(player.overall) || 65;
        const fitness = Number(player.fitness ?? 85), sharpness = Number(player.sharpness ?? 70), fatigue = Number(player.fatigue ?? 10);
        const attack = (getAttr("shooting") + getAttr("finishing", 58) + getAttr("pace") + getAttr("dribbling")) / 4;
        const creation = (getAttr("passing", 62) + getAttr("vision", 60) + getAttr("ballControl", 65) + getAttr("dribbling")) / 4;
        const defense = (getAttr("defending", 45) + getAttr("tackling", 40) + getAttr("interceptions", 38) + getAttr("physical")) / 4;
        const positionBonus = { ST: attack, LW: attack, RW: attack, CAM: creation, CM: creation, CB: defense, LB: defense, RB: defense, GK: getAttr("reactions", 60) }[position] || attack;
        const condition = fitness * 0.45 + sharpness * 0.35 + (100 - fatigue) * 0.20;
        return overall * 0.45 + positionBonus * 0.35 + condition * 0.20;
    };

    const playMatch = () => {
        if (btn) btn.disabled = true;
        const performance = calculatePerformance();
        const opponent = Math.floor(Math.random() * 26) + 62;
        const matchFactor = performance - opponent + (Math.random() * 20 - 10);
        const teamGoals = clamp(Math.round(1.35 + matchFactor / 18 + (Math.random() * 2 - 1)), 0, 5);
        const opponentGoals = clamp(Math.round(1.25 - matchFactor / 20 + (Math.random() * 2 - 1)), 0, 5);
        const outcome = teamGoals > opponentGoals ? "win" : teamGoals < opponentGoals ? "loss" : "draw";
        const rating = clamp((6.2 + (performance - opponent) / 13 + Math.random() * 1.5).toFixed(1), 4, 10);
        const position = player.position || "ST";
        const goalChance = ["ST", "LW", "RW"].includes(position) ? 0.48 : ["CAM", "CM"].includes(position) ? 0.25 : 0.10;
        const assistChance = ["CAM", "CM", "LW", "RW"].includes(position) ? 0.42 : 0.20;
        const goals = Math.min(teamGoals, Math.random() < goalChance ? 1 + (Math.random() < Math.max(0.05, (performance - 70) / 150) ? 1 : 0) : 0);
        const assists = Math.min(Math.max(0, teamGoals - goals), Math.random() < assistChance ? 1 : 0);

        player.appearances = Number(player.appearances || 0) + 1;
        player.goals = Number(player.goals || 0) + goals;
        player.assists = Number(player.assists || 0) + assists;
        player.wins = Number(player.wins || 0) + (outcome === "win" ? 1 : 0);
        player.draws = Number(player.draws || 0) + (outcome === "draw" ? 1 : 0);
        player.losses = Number(player.losses || 0) + (outcome === "loss" ? 1 : 0);
        player.fatigue = clamp(Number(player.fatigue || 0) + 13);
        player.fitness = clamp(Number(player.fitness ?? 85) - 7);
        player.sharpness = clamp(Number(player.sharpness ?? 70) + (rating >= 7 ? 3 : 1));
        const fanChange = outcome === "win" ? 4 : outcome === "draw" ? 1 : -3;
        player.fanRating = clamp(Number(player.fanRating ?? player.popularity ?? 50) + fanChange + (rating >= 8 ? 2 : rating >= 7 ? 1 : 0));
        player.popularity = player.fanRating;

        player.matchHistory = Array.isArray(player.matchHistory) ? player.matchHistory : [];
        player.matchHistory.unshift({ date: new Date().toLocaleDateString("fa-IR"), opponent: `تیم رقیب ${opponent}`, score: `${teamGoals}-${opponentGoals}`, result: outcome, goals, assists, rating: Number(rating) });
        player.matchHistory = player.matchHistory.slice(0, 10);

        player.trophyHistory = Array.isArray(player.trophyHistory) ? player.trophyHistory : [];
        const milestones = [10, 25, 50, 100];
        const milestone = milestones.find(m => player.wins >= m && !player.trophyHistory.some(t => t.type === "wins" && t.value === m));
        if (milestone) {
            const trophy = { type: "wins", value: milestone, name: `${milestone} برد` , date: new Date().toLocaleDateString("fa-IR") };
            player.trophyHistory.push(trophy);
            player.trophies = Number(player.trophies || 0) + 1;
        }

        localStorage.setItem("careerPlayer", JSON.stringify(player));
        set("resultText", `${outcome === "win" ? "برد" : outcome === "loss" ? "باخت" : "مساوی"} ${teamGoals} - ${opponentGoals}`);
        set("matchGoals", goals); set("matchAssists", assists); set("matchRating", rating); set("matchFans", `${Math.round(player.fanRating)}%`);
        const progress = document.getElementById("matchProgress"); if (progress) progress.style.width = `${player.fanRating}%`;
        if (resultBox) resultBox.style.display = "block";
        if (btn) { btn.disabled = false; btn.textContent = "▶ مسابقه بعدی"; }
    };
    if (btn) btn.addEventListener("click", playMatch);
});

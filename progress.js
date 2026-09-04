const KEY = "careerPlayer";
const player = JSON.parse(localStorage.getItem(KEY) || "null");
const labels = {
    pace: "سرعت", shooting: "شوت", passing: "پاس", dribbling: "دریبل",
    defending: "دفاع", physical: "قدرت بدنی", stamina: "استقامت", strength: "قدرت",
    vision: "دید بازی", finishing: "تمام‌کنندگی", ballControl: "کنترل توپ",
    tackling: "تکل", interceptions: "قطع توپ", composure: "خونسردی", reactions: "واکنش",
    weakFoot: "پای ضعیف", skillMoves: "حرکات تکنیکی"
};

const playerBox = document.getElementById("progressPlayer");
const box = document.getElementById("attributes");

if (!player) {
    if (playerBox) playerBox.textContent = "ابتدا بازیکن بسازید.";
} else {
    const age = Number(player.age) || 18;
    const overall = Number(player.overall) || 65;
    const potential = Math.max(overall, Math.min(99, Number(player.potential) || Math.min(99, overall + Math.max(3, 23 - age))));

    player.potential = potential;
    localStorage.setItem(KEY, JSON.stringify(player));

    if (playerBox) {
        playerBox.innerHTML = `<strong>${player.name}</strong><br>OVR: ${overall} | سن: ${age} | پتانسیل: ${potential}`;
    }

    if (box) {
        box.innerHTML = "";
        Object.entries(player.attributes || {}).forEach(([key, value]) => {
            const val = Number(value) || 0;
            const max = key === "weakFoot" || key === "skillMoves" ? 5 : 100;
            const percent = Math.max(0, Math.min(100, (val / max) * 100));
            const card = document.createElement("div");
            card.className = "stat-card";
            card.innerHTML = `
                <small>${labels[key] || key}</small>
                <strong>${Math.round(val)}${max === 5 ? "/5" : ""}</strong>
                <div class="progress"><div class="progress-bar" style="width:${percent}%"></div></div>
            `;
            box.appendChild(card);
        });
    }
}

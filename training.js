const KEY = "careerPlayer";

const fallbackPlayer = {
    name: "بازیکن جدید",
    overall: 65,
    fitness: 90,
    sharpness: 70,
    fatigue: 10,
    popularity: 50,
    value: 500000,
    attributes: {
        pace: 65, shooting: 60, passing: 60, dribbling: 62,
        defending: 45, physical: 60, mental: 55, weakfoot: 50
    }
};

function loadPlayer() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

function savePlayer(player) {
    localStorage.setItem(KEY, JSON.stringify(player));
}

function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, Number(value) || 0));
}

let player = loadPlayer() || { ...fallbackPlayer, attributes: { ...fallbackPlayer.attributes } };

const playerSelect = document.getElementById("playerSelect");

function render() {
    const overall = document.getElementById("overall");
    const fitness = document.getElementById("fitness");
    const sharpness = document.getElementById("sharpness");
    const fatigue = document.getElementById("fatigue");
    if (overall) overall.textContent = Math.round(player.overall || 0);
    if (fitness) fitness.textContent = Math.round(player.fitness || 0);
    if (sharpness) sharpness.textContent = Math.round(player.sharpness || 0);
    if (fatigue) fatigue.textContent = Math.round(player.fatigue || 0);
    if (playerSelect && !playerSelect.value) {
        const option = [...playerSelect.options].find(o => o.value === "careerPlayer");
        if (option) option.textContent = player.name;
    }
}

if (playerSelect) {
    if (![...playerSelect.options].some(o => o.value === "careerPlayer")) {
        const option = document.createElement("option");
        option.value = "careerPlayer";
        option.textContent = player.name;
        playerSelect.appendChild(option);
    }
    playerSelect.value = "careerPlayer";
    playerSelect.addEventListener("change", render);
}

function startTraining(type) {
    const names = {
        pace: "تمرین سرعت",
        shooting: "تمرین شوت",
        passing: "تمرین پاس",
        dribbling: "تمرین دریبل",
        defending: "تمرین دفاع",
        physical: "تمرین قدرت بدنی",
        mental: "تمرین ذهنی",
        weakfoot: "تمرین پای ضعیف"
    };

    if (!names[type]) return;

    player.attributes = player.attributes || { ...fallbackPlayer.attributes };
    const gain = type === "mental" || type === "weakfoot" ? 1 : 2;
    const before = Number(player.attributes[type]) || 0;
    player.attributes[type] = clamp(before + gain);

    player.sharpness = clamp((player.sharpness || 0) + gain);
    player.fatigue = clamp((player.fatigue || 0) + 5);
    if (player.fatigue >= 80) player.fitness = clamp((player.fitness || 0) - 2);

    const values = Object.values(player.attributes).map(Number).filter(Number.isFinite);
    if (values.length) player.overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    player.value = Math.round((player.value || 500000) * (1 + gain / 1000));

    savePlayer(player);
    render();

    const result = document.getElementById("trainingResult");
    if (result) {
        result.innerHTML = `<div class="training-success"><strong>✅ ${names[type]}</strong><br>${player.name} تمرین را با موفقیت انجام داد.<br>⭐ پیشرفت: +${gain}<br>😓 خستگی: +5</div>`;
    }
}

window.startTraining = startTraining;
render();

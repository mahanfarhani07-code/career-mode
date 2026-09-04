const p = JSON.parse(localStorage.getItem("careerPlayer") || "null");
const stats = document.getElementById("trophyStats");
const list = document.getElementById("trophyList");

if (!p) {
    if (stats) stats.innerHTML = '<div class="stat-card">ابتدا بازیکن بسازید.</div>';
} else {
    const trophies = Number(p.trophies || 0);
    const wins = Number(p.wins || 0);
    const appearances = Number(p.appearances || 0);
    if (stats) {
        stats.innerHTML = `
            <div class="stat-card"><span>🏆</span><small>جام‌های کسب‌شده</small><strong>${trophies}</strong></div>
            <div class="stat-card"><span>⚽</span><small>گل‌های فصل</small><strong>${p.goals || 0}</strong></div>
            <div class="stat-card"><span>🎯</span><small>پاس گل</small><strong>${p.assists || 0}</strong></div>
            <div class="stat-card"><span>🥇</span><small>بردها</small><strong>${wins}</strong></div>
        `;
    }
    const history = Array.isArray(p.trophyHistory) ? p.trophyHistory : [];
    if (!list) {
        // no-op
    } else if (!history.length) {
        list.innerHTML = '<div class="stat-card"><strong>🏆 هنوز جامی کسب نشده</strong><p>با بردهای بیشتر و عملکرد خوب، افتخاراتت را کامل کن.</p></div>';
    } else {
        list.innerHTML = history.slice().reverse().map(t => `
            <div class="stat-card">
                <span>🏆</span>
                <small>${t.date || "فصل 2026/27"}</small>
                <strong>${t.name || "افتخار Career"}</strong>
                <p>${appearances} بازی تا این مرحله</p>
            </div>
        `).join("");
    }
}

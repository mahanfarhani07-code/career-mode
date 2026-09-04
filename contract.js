const KEY = "careerPlayer";
const player = JSON.parse(localStorage.getItem(KEY) || "null");
const box = document.getElementById("contractInfo");

if (!player) {
    if (box) box.innerHTML = '<div class="stat-card">ابتدا بازیکن بسازید.</div>';
} else {
    player.contractYears = Number(player.contractYears) || 3;
    player.salary = Number(player.salary) || 10000;
    const club = player.club || player.startingClub || "باشگاه آزاد";
    if (box) box.innerHTML = `<div class="stat-card"><span>🏟️</span><small>باشگاه فعلی</small><strong>${club}</strong></div><div class="stat-card"><span>💵</span><small>حقوق هفتگی</small><strong>${player.salary.toLocaleString()} €</strong></div><div class="stat-card"><span>📅</span><small>مدت قرارداد</small><strong>${player.contractYears} سال</strong></div><div class="stat-card"><span>💰</span><small>ارزش بازیکن</small><strong>${Number(player.value || 0).toLocaleString()} €</strong></div>`;
    localStorage.setItem(KEY, JSON.stringify(player));
}

function renewContract() {
    if (!player) return;
    player.contractYears = Math.min((Number(player.contractYears) || 3) + 2, 5);
    player.salary = Math.round((Number(player.salary) || 10000) * 1.12);
    localStorage.setItem(KEY, JSON.stringify(player));
    alert(`قرارداد ${player.name} تمدید شد! حقوق جدید: ${player.salary.toLocaleString()} €`);
    location.reload();
}
window.renewContract = renewContract;

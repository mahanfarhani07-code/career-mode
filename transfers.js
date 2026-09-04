const KEY = "careerPlayer";
const clubs = ["رئال مادرید", "منچسترسیتی", "بارسلونا", "بایرن مونیخ", "پاری سن ژرمن", "لیورپول"];
const player = JSON.parse(localStorage.getItem(KEY) || "null");
const offers = document.getElementById("offers");

if (!player) {
    const box = document.getElementById("transferPlayer");
    if (box) box.textContent = "ابتدا بازیکن بسازید.";
} else {
    const box = document.getElementById("transferPlayer");
    if (box) {
        box.innerHTML = `<strong>${player.name}</strong><br>OVR: ${player.overall} | ارزش: ${Math.round(player.value || 0).toLocaleString()} €`;
    }

    const currentClub = player.club || player.startingClub || "باشگاه آزاد";
    const base = Number(player.value || 500000);

    clubs.filter(club => club !== currentClub).slice(0, 4).forEach((club, i) => {
        const fee = Math.round(base * (1.15 + i * 0.18));
        const salary = Math.round((player.salary || 10000) * (1.1 + i * 0.12));
        const card = document.createElement("div");
        card.className = "stat-card";
        card.innerHTML = `
            <span>🏟️</span>
            <small>پیشنهاد باشگاه</small>
            <strong>${club}</strong>
            <p>مبلغ انتقال: ${fee.toLocaleString()} €</p>
            <p>حقوق: ${salary.toLocaleString()} €</p>
            <button onclick="acceptOffer('${club}',${fee},${salary})">قبول پیشنهاد</button>
        `;
        offers?.appendChild(card);
    });
}

function acceptOffer(club, fee, salary) {
    if (!player) return;

    const previousClub = player.club || player.startingClub || "باشگاه آزاد";
    player.club = club;
    player.value = Math.max(Number(player.value || 0), fee);
    player.salary = salary;
    player.transferHistory = player.transferHistory || [];
    player.transferHistory.push({
        from: previousClub,
        to: club,
        fee,
        date: new Date().toISOString()
    });

    localStorage.setItem(KEY, JSON.stringify(player));
    alert(`انتقال ${player.name} به ${club} انجام شد!`);
    location.href = "career.html";
}

window.acceptOffer = acceptOffer;

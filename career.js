document.addEventListener("DOMContentLoaded", () => {
    const raw = localStorage.getItem("careerPlayer");
    if (!raw) {
        window.location.href = "player.html";
        return;
    }

    let player;
    try { player = JSON.parse(raw); } catch { window.location.href = "player.html"; return; }

    const positions = {
        GK: "دروازه‌بان", DEF: "مدافع", MID: "هافبک", ATT: "مهاجم",
        ST: "مهاجم مرکزی", CF: "مهاجم سایه", LW: "وینگر چپ", RW: "وینگر راست",
        CAM: "هافبک هجومی", CM: "هافبک مرکزی", CDM: "هافبک دفاعی",
        LM: "هافبک چپ", RM: "هافبک راست", CB: "مدافع میانی", LB: "مدافع چپ", RB: "مدافع راست"
    };
    const feet = { right: "راست", left: "چپ", both: "هر دو پا" };
    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value ?? "—"; };

    set("playerName", player.name);
    set("playerOverall", player.overall);
    set("playerDetails", `${positions[player.position] || player.position || "—"} • ${feet[player.preferredFoot] || player.preferredFoot || "—"} • ${player.nationality || "—"}`);
    set("playerClub", player.club || player.startingClub || "آزاد");
    set("playerAge", player.age);
    set("playerValue", formatMoney(player.value));
    set("playerSalary", formatMoney(player.salary));
    set("playerGoals", player.goals || 0);
    set("playerAssists", player.assists || 0);
    set("playerAppearances", player.appearances || 0);
    set("playerTrophies", player.trophies || 0);

    const fanRating = Math.max(0, Math.min(100, Number(player.fanRating ?? player.popularity ?? 50)));
    set("fanRating", `${Math.round(fanRating)}%`);
    const progress = document.getElementById("fanProgress");
    if (progress) progress.style.width = `${fanRating}%`;
});

function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "EUR", maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

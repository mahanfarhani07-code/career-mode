// ======================================
// Career Football
// Career Dashboard
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // دریافت اطلاعات بازیکن
    const savedPlayer = localStorage.getItem("careerPlayer");

    // اگر بازیکنی ذخیره نشده باشد
    if (!savedPlayer) {
        alert("هنوز بازیکنی ساخته نشده است.");
        window.location.href = "create-player.html";
        return;
    }

    const player = JSON.parse(savedPlayer);


    // -----------------------------
    // تبدیل پست به نام فارسی
    // -----------------------------

    const positions = {
        GK: "دروازه‌بان",
        DEF: "مدافع",
        MID: "هافبک",
        ATT: "مهاجم"
    };


    // -----------------------------
    // تبدیل پای تخصصی
    // -----------------------------

    const feet = {
        right: "راست",
        left: "چپ",
        both: "هر دو پا"
    };


    // -----------------------------
    // نمایش اطلاعات بازیکن
    // -----------------------------

    document.getElementById("playerName").textContent =
        player.name;

    document.getElementById("playerOverall").textContent =
        player.overall;

    document.getElementById("playerDetails").textContent =
        ${positions[player.position] || player.position} •  +
        ${feet[player.preferredFoot] || player.preferredFoot} •  +
        ${player.nationality};


    // -----------------------------
    // اطلاعات اصلی
    // -----------------------------

    document.getElementById("playerClub").textContent =
        player.startingClub;

    document.getElementById("playerAge").textContent =
        player.age;


    document.getElementById("playerValue").textContent =
        formatMoney(player.value);


    document.getElementById("playerSalary").textContent =
        formatMoney(player.salary);


    // -----------------------------
    // آمار
    // -----------------------------

    document.getElementById("playerGoals").textContent =
        player.goals;

    document.getElementById("playerAssists").textContent =
        player.assists;

    document.getElementById("playerAppearances").textContent =
        player.appearances;

    document.getElementById("playerTrophies").textContent =
        player.trophies;


    // -----------------------------
    // رضایت هواداران
    // -----------------------------

    const fanRating =
        Math.max(0, Math.min(100, player.fanRating));

    document.getElementById("fanRating").textContent =
        ${fanRating}%;

    document.getElementById("fanProgress").style.width =
        ${fanRating}%;

});


// ======================================
// نمایش پول با فرمت مناسب
// ======================================

function formatMoney(value) {

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0
    }).format(value);

}

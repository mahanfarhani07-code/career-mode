// ======================================
// Career Football
// Create Player System
// ======================================

const playerForm = document.getElementById("playerForm");

playerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // دریافت اطلاعات بازیکن
    const player = {

        name: document.getElementById("playerName").value.trim(),

        position:
            document.getElementById("playerPosition").value,

        preferredFoot:
            document.getElementById("preferredFoot").value,

        age:
            Number(document.getElementById("playerAge").value),

        nationality:
            document.getElementById("playerNationality").value.trim(),

        startingClub:
            document.getElementById("startingClub").value.trim(),

        overall:
            Number(document.getElementById("playerOverall").value),

        value:
            Number(document.getElementById("playerValue").value),

        salary:
            Number(document.getElementById("playerSalary").value),

        // آمار اولیه
        goals: 0,
        assists: 0,
        appearances: 0,

        // جام‌ها
        trophies: 0,

        // رضایت هواداران
        fanRating: 50,

        // فصل
        season: "2026/27"
    };


    // بررسی اطلاعات ضروری
    if (
        !player.name ||
        !player.position ||
        !player.preferredFoot ||
        !player.age ||
        !player.nationality ||
        !player.startingClub
    ) {

        alert("لطفاً تمام اطلاعات بازیکن را کامل کن.");
        return;
    }


    // ذخیره بازیکن در مرورگر
    localStorage.setItem(
        "careerPlayer",
        JSON.stringify(player)
    );


    // ثبت شروع کریر
    localStorage.setItem(
        "careerStarted",
        "true"
    );


    // پیام موفقیت
    alert(
        بازیکن ${player.name} با موفقیت ساخته شد! ⚽
    );


    // رفتن به داشبورد کریر
    window.location.href = "career.html";

});

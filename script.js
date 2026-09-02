// ================================
// Career Football
// Main JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const startCareerBtn =
        document.getElementById("startCareerBtn");

    // شروع کریر
    startCareerBtn.addEventListener("click", () => {

        // ذخیره وضعیت شروع بازی
        localStorage.setItem(
            "careerStarted",
            "true"
        );

        // انتقال به صفحه ساخت بازیکن
        window.location.href = "create-player.html";
    });

});

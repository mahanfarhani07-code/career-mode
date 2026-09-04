document.addEventListener("DOMContentLoaded", () => {
    const startCareerBtn = document.getElementById("startCareerBtn");
    if (startCareerBtn) {
        startCareerBtn.addEventListener("click", () => {
            localStorage.setItem("careerStarted", "true");
            window.location.href = "player.html";
        });
    }
});

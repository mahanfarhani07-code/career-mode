const teamGoals =
            Math.floor(Math.random() * 3)
            + goals;

        if (teamGoals > opponentGoals) {
            return {
                text: برد ${teamGoals} - ${opponentGoals},
                type: "win"
            };
        }

        if (teamGoals < opponentGoals) {
            return {
                text: باخت ${teamGoals} - ${opponentGoals},
                type: "loss"
            };
        }

        return {
            text: مساوی ${teamGoals} - ${opponentGoals},
            type: "draw"
        };
    }


    // -----------------------------
    // تغییر رضایت هواداران
    // -----------------------------

    function calculateFanChange(result) {

        if (result.type === "win") {
            return 5;
        }

        if (result.type === "draw") {
            return 1;
        }

        return -4;
    }


    // -----------------------------
    // نمایش نتیجه
    // -----------------------------

    function showResult(
        result,
        goals,
        assists,
        rating,
        fans
    ) {

        const resultBox =
            document.getElementById("matchResult");

        resultBox.style.display = "block";


        document.getElementById("resultText").textContent =
            result.text;


        document.getElementById("matchGoals").textContent =
            goals;


        document.getElementById("matchAssists").textContent =
            assists;


        document.getElementById("matchRating").textContent =
            rating;


        document.getElementById("matchFans").textContent =
            ${fans}%;


        document.getElementById("matchProgress").style.width =
            ${fans}%;


        playMatchBtn.disabled = false;

        playMatchBtn.textContent =
            "▶ مسابقه بعدی";
    }

});

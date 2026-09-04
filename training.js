const players = {
    player1: {
        name: "Cristiano Ronaldo",
        overall: 85,
        fitness: 88,
        sharpness: 75,
        fatigue: 20
    },

    player2: {
        name: "Neymar Jr",
        overall: 90,
        fitness: 82,
        sharpness: 80,
        fatigue: 25
    },

    player3: {
        name: "Kylian Mbappé",
        overall: 91,
        fitness: 94,
        sharpness: 87,
        fatigue: 10
    },

    player4: {
        name: "Vinícius Jr",
        overall: 89,
        fitness: 91,
        sharpness: 84,
        fatigue: 12
    }
};


// انتخاب بازیکن

const playerSelect = document.getElementById("playerSelect");

playerSelect.addEventListener("change", function () {

    const player = players[this.value];

    if (!player) return;

    updatePlayerStats(player);
});


// نمایش اطلاعات بازیکن

function updatePlayerStats(player) {

    document.getElementById("overall").textContent =
        player.overall;

    document.getElementById("fitness").textContent =
        player.fitness;

    document.getElementById("sharpness").textContent =
        player.sharpness;

    document.getElementById("fatigue").textContent =
        player.fatigue;
}


// انجام تمرین

function startTraining(type) {

    const selectedPlayer = playerSelect.value;

    if (!selectedPlayer) {

        document.getElementById("trainingResult").textContent =
            "⚠️ ابتدا یک بازیکن را انتخاب کنید.";

        return;
    }

    const player = players[selectedPlayer];

    let trainingName = "";
    let improvement = 0;


    switch (type) {

        case "pace":
            trainingName = "تمرین سرعت";
            improvement = 2;
            break;

        case "shooting":
            trainingName = "تمرین شوت";
            improvement = 2;
            break;

        case "passing":
            trainingName = "تمرین پاس";
            improvement = 2;
            break;

        case "dribbling":
            trainingName = "تمرین دریبل";
            improvement = 2;
            break;

        case "defending":
            trainingName = "تمرین دفاع";
            improvement = 2;
            break;

        case "physical":
            trainingName = "تمرین قدرت بدنی";
            improvement = 2;
            break;

        case "mental":
            trainingName = "تمرین ذهنی";
            improvement = 1;
            break;

        case "weakfoot":
            trainingName = "تمرین پای ضعیف";
            improvement = 1;
            break;
    }


    // افزایش Sharpness

    player.sharpness += improvement;

    if (player.sharpness > 100) {
        player.sharpness = 100;
    }


    // افزایش خستگی

    player.fatigue += 5;

    if (player.fatigue > 100) {
        player.fatigue = 100;
    }


    // کاهش آمادگی در صورت خستگی زیاد

    if (player.fatigue >= 80) {

        player.fitness -= 2;

        if (player.fitness < 0) {
            player.fitness = 0;
        }
    }


    // نمایش اطلاعات جدید

    updatePlayerStats(player);


    // نمایش نتیجه

    document.getElementById("trainingResult").innerHTML =
        
        <div>
            <strong>✅ ${trainingName}</strong>
            <br>
            ${player.name} تمرین را انجام داد.
            <br>
            ⭐ Sharpness: +${improvement}
            <br>
            😓 Fatigue: +5
        </div>
        ;
}

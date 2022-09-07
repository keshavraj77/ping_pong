var ball = document.getElementById('ball');
var Keshav = document.getElementById('rod1');
var Mayank = document.getElementById('rod2');


const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "Keshav";
const rod2Name = "Mayank";


let score,
    maxScore,
    movement,
    rod,
    ballSpeedX = 5,
    ballSpeedY = 5;

let gameOn = false;

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;



(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === "null" || maxScore === "null") {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Keshav"
    } else {
        alert(rod + " has maximum score of " + maxScore * 100);
    }

    resetBoard();
})();



function resetBoard() {

    Keshav.style.top = (window.innerHeight +450) / 2 + 'px';
    Mayank.style.top = (window.innerHeight-500 ) / 2 + 'px';
    ball.style.top = (windowHeight +500) / 2 + 'px';
    ball.style.left = (Keshav.offsetLeft + Keshav.offsetWidth) + 'px';
    


    // Lossing player gets the ball
    // if (rodName === rod2Name) {
    //     ball.style.left = (Keshav.offsetLeft + Keshav.offsetWidth) + 'px';
    //     ballSpeedY= 20;
    // } else if (rodName === rod1Name) {
    //     ball.style.left = (Mayank.offsetLeft - Mayank.offsetWidth-4) + 'px';
    //     ballSpeedY= -20;
    // }

    score = 0;
    gameOn = false;

}



function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }

    clearInterval(movement);
    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));
    resetBoard();
    ballSpeedX = 5,
    ballSpeedY = 5;


    
}



window.addEventListener('keypress', function () {
    let rodSpeed = 50;

    let rodRect1 = Keshav.getBoundingClientRect();
    let rodRect2 = Mayank.getBoundingClientRect();



    if (event.code === "KeyS" && ((rodRect1.y + rodRect1.height) < window.innerHeight)) {
        Keshav.style.top = (rodRect1.y) + rodSpeed + 'px';
    } else if (event.code === "KeyW" && (rodRect1.y > 0)) {
        Keshav.style.top = (rodRect1.y) - rodSpeed + 'px';}
        else if (event.code === "KeyD" && ((rodRect2.y + rodRect2.height) < window.innerHeight)) {
            Mayank.style.top = (rodRect2.y) + rodSpeed + 'px';
        } else if (event.code === "KeyA" && (rodRect2.y > 0)) {
            Mayank.style.top = (rodRect2.y) - rodSpeed + 'px';}
    



    if (event.code === "Enter") {

        if (!gameOn) {
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let KeshavHeight = Keshav.offsetHeight;
            let MayankHeight = Mayank.offsetHeight;
            let KeshavWidth = Keshav.offsetWidth;
            let MayankWidth = Mayank.offsetWidth;


            movement = setInterval(function () {
                // Move ball 
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1Y = Keshav.getBoundingClientRect().y;
                rod2Y = Mayank.getBoundingClientRect().y;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';


                if ((ballY + ballDia) > windowHeight || ballY < 0) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                }

                // It specifies the center of the ball on the viewport
                let ballPos = ballY + ballDia / 2;

                // Check for Rod 1
                if (ballX <= KeshavWidth) {
                    ballSpeedX = -ballSpeedX; // Reverses the direction
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod1Y) || (ballPos > (rod1Y + KeshavHeight))) {
                        storeWin(rod2Name, score);
                    }
                }

                // Check for Rod 2
                else if ((ballX + ballDia) >= (windowWidth - MayankWidth)) {
                    ballSpeedX = -ballSpeedX; // Reverses the direction
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod2Y) || (ballPos > (rod2Y + MayankHeight))) {
                        storeWin(rod1Name, score);
                    }
                }

            }, 10);

        }
    }

});

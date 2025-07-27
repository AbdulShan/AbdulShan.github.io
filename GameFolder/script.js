const car = document.getElementById('car');
const pothole = document.getElementById('pothole');
const healthBar = document.getElementById('health');
const gameOverText = document.getElementById('game-over');

let carPosition = 190;
let potholePosition = -40;
let health = 100;
let potholeHitCount = 0;
const maxHits = 20;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && carPosition > 20) {
        carPosition -= 40;
        car.style.left = `${carPosition}px`;
    }
    if (e.key === 'ArrowRight' && carPosition < 320) {
        carPosition += 40;
        car.style.left = `${carPosition}px`;
    }
});

function movePothole() {
    potholePosition += 20;
    pothole.style.top = `${potholePosition}px`;

    if (potholePosition > 700) {
        potholePosition = -potholePosition;
        pothole.style.left = `${Math.floor(Math.random() * 360)}px`;
    }
    checkCollision();
}

function checkCollision() {
    const potholeRect = pothole.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();

    if (
        potholeRect.top < carRect.bottom &&
        potholeRect.bottom > carRect.top &&
        potholeRect.left < carRect.right &&
        potholeRect.right > carRect.left
    ) {
        potholePosition = -potholePosition;
        pothole.style.left = `${Math.floor(Math.random() * 360)}px`;
        potholeHitCount++;
        updateHealth();
    }
}

function updateHealth() {
    health -= 10;
    healthBar.style.width = `${health}%`;

    if (potholeHitCount >= maxHits) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(potholeInterval);
    gameOverText.style.display = 'block';
}

const potholeInterval = setInterval(movePothole, 100);

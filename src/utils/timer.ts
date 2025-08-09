// let timerId: number | null = null; // для хранения идентификатора анимации

let winnerStatus: boolean = false;

export const TIMER = {
  status: false,
  time: '', // Время в формате "сек. мс"
};

let startTime: number | null = null;
let timerId: number | null = null;

function startTimer() {
  winnerStatus = true;
  if (TIMER.status && startTime === null) {
    startTime = Date.now();
  }
  console.log(TIMER.time, TIMER.status, 'start');
}

function stopTimer() {
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }
  if (startTime !== null) {
    const now = Date.now();
    const elapsed = now - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const milliseconds = elapsed % 1000;
    // Записываем время в TIMER.time
    if (winnerStatus === true) {
      TIMER.time = `${seconds}.${milliseconds}`;
      winnerStatus = false;
    }
    startTime = null;
  }
  console.log(TIMER.time, TIMER.status, 'stop');
}

// Контрольная функция для запуска/остановки
function controlTimer() {
  if (TIMER.status) {
    startTimer();
  } else {
    stopTimer();
  }
}

export default controlTimer;

// const timerDisplay = document.createElement('div');
// document.body.appendChild(timerDisplay);

// const TIMER = {
//   status: false,
//   time: '',
// };

// const startTime = Date.now();

// function updateTimer() {
//   const now = Date.now();
//   const elapsed = now - startTime;
//   const seconds = Math.floor(elapsed / 1000);
//   const milliseconds = elapsed % 1000;

//   timerDisplay.textContent = `Время: ${seconds} сек, ${milliseconds} мс`;

//   requestAnimationFrame(updateTimer);
// }

// updateTimer();

let winnerStatus: boolean = false;
let startTime: number | null = null;
let timerId: number | null = null;

export const TIMER = {
  status: false,
  time: '',
};

function startTimer() {
  winnerStatus = true;
  if (TIMER.status && startTime === null) {
    startTime = Date.now();
  }
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

    if (winnerStatus === true) {
      TIMER.time = `${seconds}.${milliseconds}`;
      winnerStatus = false;
    }
    startTime = null;
  }
}

function controlTimer() {
  if (TIMER.status) {
    startTimer();
  } else {
    stopTimer();
  }
}

export default controlTimer;

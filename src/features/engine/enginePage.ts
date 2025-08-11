import controlTimer, { TIMER } from '../../utils/timer';
import { handleStartError, handleDriveRequest } from './engineStatus';
import { startEngine } from './engineControls';
import animationStates from '../../types/engine';

function initAnimationState(id: number) {
  animationStates[id] = {
    isDriving: false,
    animationFrameId: null,
  };
}

async function getMovementParams(id: number) {
  const engineResponse = await startEngine(id);
  TIMER.status = true;
  controlTimer();

  return {
    velocity: engineResponse.velocity,
    distance: engineResponse.distance,
  };
}

function calculateTargetPosition(): number {
  const road = document.querySelector('.road');
  if (road && road instanceof HTMLElement) {
    return road.offsetWidth - 45;
  }
  return 0;
}

function createAnimationFunction(
  id: number,
  svgElement: HTMLElement,
  startTime: number,
  targetPosition: number,
  velocity: number,
  distance: number
) {
  let currentPosition = 0;

  return function animate() {
    if (!animationStates[id]?.isDriving) return;

    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / (distance / velocity), 1);
    currentPosition = progress * targetPosition;
    svgElement.style.transform = `translateX(${currentPosition}px)`;

    if (progress < 1) {
      const animationFrameId = requestAnimationFrame(animate);
      animationStates[id].animationFrameId = animationFrameId;
    } else {
      animationStates[id].isDriving = false;
      animationStates[id].animationFrameId = null;
    }
  };
}

export function stopCarAnimation(svgElement: HTMLElement, position: number) {
  svgElement.style.transform = `translateX(${position}px)`;
  svgElement.style.transition = 'none';
}

function startMovementAnimation(
  id: number,
  svgElement: HTMLElement,
  targetPosition: number,
  velocity: number,
  distance: number
) {
  const startTime = Date.now();
  const animate = createAnimationFunction(
    id,
    svgElement,
    startTime,
    targetPosition,
    velocity,
    distance
  );

  const animationFrameId = requestAnimationFrame(animate);
  animationStates[id].animationFrameId = animationFrameId;
  return startTime;
}

export function getCurrentPosition(svgElement: HTMLElement): number {
  const { transform } = window.getComputedStyle(svgElement);
  if (transform === 'none') return 0;

  const matrix = new DOMMatrix(transform);
  return matrix.m41;
}

export function resetAnimationState(id: number) {
  if (animationStates[id]) {
    animationStates[id].isDriving = false;
    animationStates[id].animationFrameId = null;
  }
}

export function handleCarBreakdown(svgElement: HTMLElement, position: number) {
  stopCarAnimation(svgElement, position);
  svgElement.style.filter = 'grayscale(100%)';
  svgElement.style.opacity = '0.7';
  svgElement.style.animation = 'shake 0.5s';
  setTimeout(() => {
    svgElement.style.animation = '';
  }, 50);
}

export async function startAndAnimateCar(id: number, svgElement: HTMLElement) {
  initAnimationState(id);

  try {
    const { velocity, distance } = await getMovementParams(id);

    const targetPosition = calculateTargetPosition();

    animationStates[id].isDriving = true;

    startMovementAnimation(id, svgElement, targetPosition, velocity, distance);

    await handleDriveRequest(id, svgElement);
  } catch (error) {
    handleStartError(id, svgElement, error);
  } finally {
    if (animationStates[id]?.animationFrameId) {
      cancelAnimationFrame(animationStates[id].animationFrameId);
    }
    resetAnimationState(id);
  }
}

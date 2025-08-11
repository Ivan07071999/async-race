import controlTimer, { TIMER } from '../../utils/timer';
import { handleStartError, handleDriveRequest } from './engineStatus';
import { startEngine } from './engineControls';
import animationStates from '../../types/engine';

// Инициализация состояния анимации
function initAnimationState(id: number) {
  animationStates[id] = {
    isDriving: false,
    animationFrameId: null,
  };
}

// Получение параметров движения
async function getMovementParams(id: number) {
  const engineResponse = await startEngine(id);
  TIMER.status = true;
  controlTimer();

  console.log(
    `Engine started for car ${id}: velocity=${engineResponse.velocity}, distance=${engineResponse.distance}`
  );
  return {
    velocity: engineResponse.velocity,
    distance: engineResponse.distance,
  };
}

// Расчет целевой позиции
function calculateTargetPosition(): number {
  const road = document.querySelector('.road');
  if (road && road instanceof HTMLElement) {
    return road.offsetWidth - 45;
  }
  return 0;
}

// Создание функции анимации
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
      // Анимация завершена
      animationStates[id].isDriving = false;
      animationStates[id].animationFrameId = null;
    }
  };
}

// Функция остановки анимации (без изменений)
export function stopCarAnimation(svgElement: HTMLElement, position: number) {
  svgElement.style.transform = `translateX(${position}px)`;
  svgElement.style.transition = 'none';
}

// Запуск анимации движения
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

// Получение текущей позиции автомобиля
export function getCurrentPosition(svgElement: HTMLElement): number {
  const { transform } = window.getComputedStyle(svgElement);
  if (transform === 'none') return 0;

  const matrix = new DOMMatrix(transform);
  return matrix.m41;
}

// Сброс состояния анимации
export function resetAnimationState(id: number) {
  if (animationStates[id]) {
    animationStates[id].isDriving = false;
    animationStates[id].animationFrameId = null;
  }
}

// Функция обработки поломки автомобиля (без изменений)
export function handleCarBreakdown(svgElement: HTMLElement, position: number) {
  stopCarAnimation(svgElement, position);
  svgElement.style.filter = 'grayscale(100%)';
  svgElement.style.opacity = '0.7';
  svgElement.style.animation = 'shake 0.5s';
  setTimeout(() => {
    svgElement.style.animation = '';
  }, 50);
}

// Основная функция для запуска и анимации автомобиля
export async function startAndAnimateCar(id: number, svgElement: HTMLElement) {
  initAnimationState(id);

  try {
    // Получаем параметры движения
    const { velocity, distance } = await getMovementParams(id);

    // Рассчитываем целевую позицию
    const targetPosition = calculateTargetPosition();

    // Устанавливаем флаг движения
    animationStates[id].isDriving = true;

    // Запускаем анимацию
    startMovementAnimation(id, svgElement, targetPosition, velocity, distance);

    // Обрабатываем запрос на движение
    await handleDriveRequest(id, svgElement);
  } catch (error) {
    handleStartError(id, svgElement, error);
  } finally {
    // Гарантированная остановка анимации
    if (animationStates[id]?.animationFrameId) {
      cancelAnimationFrame(animationStates[id].animationFrameId);
    }
    resetAnimationState(id);
  }
}

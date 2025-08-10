import updateWinnersOnServer from '../../store/winners/winnersThunks';
import {
  disabledButtons,
  enableCarButtons,
  enableHeaderForms,
  enableWinnersButton,
} from '../../utils/disableButtons';
import controlTimer, { TIMER } from '../../utils/timer';
import { garagePages } from '../garage/garageCreateCars';

const animationStates: Record<
  number,
  {
    isDriving: boolean;
    animationFrameId: number | null;
  }
> = {};

// Функция для отправки запросов к серверу
async function sendEngineRequest(id: number, status: string, speed?: number) {
  const serverUrl = 'http://localhost:3000';
  const url = new URL('/engine', serverUrl);
  url.searchParams.append('id', id.toString());
  url.searchParams.append('status', status);

  if (speed !== undefined) {
    url.searchParams.append('speed', speed.toString());
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Engine request failed:', error);
    throw error;
  }
}

// Функция запуска двигателя
export async function startEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'started');
    return response;
  } catch (error) {
    console.error('Failed to start engine:', error);
    throw error;
  }
}

// Функция остановки двигателя
export async function stopEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'stopped');
    return response;
  } catch (error) {
    console.error('Failed to stop engine:', error);
    throw error;
  }
}

// Функция начала движения
export async function startDrive(id: number): Promise<{ success: boolean }> {
  try {
    const response = await sendEngineRequest(id, 'drive');
    return response;
  } catch (error) {
    console.error('Failed to start drive:', error);
    throw error;
  }
}

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

// Функция остановки анимации
// Функция остановки анимации (без изменений)
function stopCarAnimation(svgElement: HTMLElement, position: number) {
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
function getCurrentPosition(svgElement: HTMLElement): number {
  const { transform } = window.getComputedStyle(svgElement);
  if (transform === 'none') return 0;

  const matrix = new DOMMatrix(transform);
  return matrix.m41;
}

// Сброс состояния анимации
function resetAnimationState(id: number) {
  if (animationStates[id]) {
    animationStates[id].isDriving = false;
    animationStates[id].animationFrameId = null;
  }
}

// Обработка ошибок запуска
function handleStartError(id: number, svgElement: HTMLElement, error: unknown) {
  console.error(`Error starting car ${id}:`, error);
  const currentPosition = getCurrentPosition(svgElement);
  stopCarAnimation(svgElement, currentPosition);

  if (error instanceof Error) {
    if (error.message.includes('429')) {
      console.log('Car is already in drive mode');
    } else if (error.message.includes('404')) {
      console.log('Engine not started or car not found');
    }
  }
  resetAnimationState(id);
}

// Функция обработки поломки автомобиля (без изменений)
function handleCarBreakdown(svgElement: HTMLElement, position: number) {
  stopCarAnimation(svgElement, position);
  svgElement.style.filter = 'grayscale(100%)';
  svgElement.style.opacity = '0.7';
  svgElement.style.animation = 'shake 0.5s';
  setTimeout(() => {
    svgElement.style.animation = '';
  }, 50);
}

// Обработка запроса на движение
async function handleDriveRequest(id: number, svgElement: HTMLElement) {
  try {
    await startDrive(id);
    if (TIMER.status !== false) {
      updateWinnersOnServer(id);
    }
    TIMER.status = false;

    controlTimer();
    disabledButtons(garagePages.PAGE_NUMBER);
    enableWinnersButton();
    enableHeaderForms();
    enableCarButtons();
    console.log(`Drive completed successfully for car ${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('500')) {
      console.log(`Car ${id} broke down during the race`);
      const currentPosition = getCurrentPosition(svgElement);
      handleCarBreakdown(svgElement, currentPosition);
      resetAnimationState(id);
    } else {
      throw error;
    }
  }
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

// Функция для кнопки B (остановка двигателя)
export async function stopCarEngine(id: number, svgElement: HTMLElement) {
  try {
    await stopEngine(id);
    console.log(`Engine stopped for car ${id}`);

    // Останавливаем анимацию через глобальное состояние
    const state = animationStates[id];
    if (state) {
      state.isDriving = false;
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
      }
    }

    // Сбрасываем позицию и стили
    svgElement.style.transform = 'translateX(0)';
    svgElement.style.filter = '';
    svgElement.style.opacity = '';
    svgElement.style.transition = 'none';
    svgElement.style.animation = '';
  } catch (error) {
    console.error(`Error stopping car ${id}:`, error);
  }
}

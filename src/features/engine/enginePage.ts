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

// Основная функция для запуска и анимации автомобиля
export async function startAndAnimateCar(id: number, svgElement: HTMLElement) {
  let animationFrameId: number | null = null;
  let startTime: number;
  let isDriving = false;
  let currentPosition = 0;
  let targetPosition: number;
  let velocity: number;
  let distance: number;
  const road = document.querySelector('.road');
  const distanceAnimate = road.offsetWidth;

  try {
    // 1. Запускаем двигатель
    const engineResponse = await startEngine(id);
    velocity = engineResponse.velocity;
    distance = engineResponse.distance;
    console.log(
      `Engine started for car ${id}: velocity=${velocity}, distance=${distance}`
    );

    // 2. Начинаем движение
    isDriving = true;
    startTime = Date.now();
    // targetPosition = window.innerWidth - 100; // Позиция финиша (минус ширина машины)
    targetPosition = distanceAnimate - 45;

    // 3. Запускаем анимацию движения
    const animate = () => {
      if (!isDriving) return;

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (distance / velocity), 1);
      currentPosition = progress * targetPosition;

      svgElement.style.transform = `translateX(${currentPosition}px)`;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // 4. Отправляем запрос на начало движения и ждем ответа
    try {
      await startDrive(id);
      console.log(`Drive completed successfully for car ${id}`);
    } catch (error) {
      // Обрабатываем ошибку 500 (поломка)
      if (error.message.includes('500')) {
        console.log(`Car ${id} broke down during the race`);
        handleCarBreakdown(svgElement, currentPosition);
      } else {
        throw error; // Пробрасываем другие ошибки
      }
    }
  } catch (error) {
    console.error(`Error starting car ${id}:`, error);
    stopCarAnimation(svgElement, currentPosition);

    // Обработка других ошибок
    if (error instanceof Error) {
      if (error.message.includes('429')) {
        console.log('Car is already in drive mode');
      } else if (error.message.includes('404')) {
        console.log('Engine not started or car not found');
      }
    }
  } finally {
    // Останавливаем анимацию в любом случае
    isDriving = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }
}

// Функция остановки анимации
function stopCarAnimation(svgElement: HTMLElement, position: number) {
  svgElement.style.transform = `translateX(${position}px)`;
  svgElement.style.transition = 'none';
}

// Функция обработки поломки автомобиля
function handleCarBreakdown(svgElement: HTMLElement, position: number) {
  // Останавливаем анимацию
  stopCarAnimation(svgElement, position);

  // Визуальные эффекты поломки
  svgElement.style.filter = 'grayscale(100%)';
  svgElement.style.opacity = '0.7';

  // Добавляем эффект вибрации
  svgElement.style.animation = 'shake 0.5s';
  setTimeout(() => {
    svgElement.style.animation = '';
  }, 50);

  console.log('Car broke down during the race');
}

// Функция для кнопки B (остановка двигателя)
export async function stopCarEngine(id: number, svgElement: HTMLElement) {
  try {
    await stopEngine(id);
    console.log(`Engine stopped for car ${id}`);

    // Останавливаем анимацию
    const currentTransform = window.getComputedStyle(svgElement).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41; // Получаем текущую позицию X
    console.log(currentPosition);
    svgElement.style.transform = 'none';

    stopCarAnimation(svgElement, currentPosition);

    // Сброс стилей
    svgElement.style.filter = '';
    svgElement.style.opacity = '';
    svgElement.style.transform = 'translateX(0)';
  } catch (error) {
    console.error(`Error stopping car ${id}:`, error);
  }
}

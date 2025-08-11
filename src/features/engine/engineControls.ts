import sendEngineRequest from '../../store/engine/engineThunks';
import animationStates from '../../types/engine';

export function startRace(selector: string) {
  const startRaceButtons = document.querySelectorAll(`.${selector}`);

  const clickPromises = Array.from(startRaceButtons).map(button => {
    return new Promise<void>(resolve => {
      (button as HTMLElement).click();
      resolve();
    });
  });

  Promise.all(clickPromises);
}

export async function startEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'started');
    return response;
  } catch (error) {
    throw new Error(`Failed to start engine:${error}`);
  }
}

export async function stopEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  try {
    const response = await sendEngineRequest(id, 'stopped');
    return response;
  } catch (error) {
    throw new Error(`Failed to stop engine:${error}`);
  }
}

export async function startDrive(id: number): Promise<{ success: boolean }> {
  try {
    const response = await sendEngineRequest(id, 'drive');
    return response;
  } catch (error) {
    throw new Error(`Failed to start drive:${error}`);
  }
}

export async function stopCarEngine(id: number, svgElement: HTMLElement) {
  try {
    await stopEngine(id);

    const state = animationStates[id];
    if (state) {
      state.isDriving = false;
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
      }
    }

    svgElement.style.transform = 'translateX(0)';
    svgElement.style.filter = '';
    svgElement.style.opacity = '';
    svgElement.style.transition = 'none';
    svgElement.style.animation = '';
  } catch (error) {
    throw new Error(`Error stopping car ${id}:${error}`);
  }
}

import { TIMER } from '../../utils/timer';

async function updateWinnersOnServer(id: number): Promise<void> {
  try {
    const baseUrl = 'http://localhost:3000';
    const existingWinnerResponse = await fetch(`${baseUrl}/winners/${id}`);
    const newWinnerTime = Number(TIMER.time);

    if (existingWinnerResponse.ok) {
      const existingWinner = (await existingWinnerResponse.json()) as {
        id: number;
        wins: number;
        time: number;
      };

      await fetch(`${baseUrl}/winners/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          wins: existingWinner.wins + 1,
          time: newWinnerTime,
        }),
      });
    } else if (existingWinnerResponse.status === 404) {
      await fetch(`${baseUrl}/winners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          wins: 1,
          time: newWinnerTime,
        }),
      });
    } else {
      throw new Error(
        `Failed to fetch winner. Status: ${existingWinnerResponse.status}`
      );
    }
  } catch (error) {
    console.error('Error updating winners:', error);
    throw error;
  }
}

export default updateWinnersOnServer;

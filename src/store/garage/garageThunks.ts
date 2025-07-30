export interface ICar {
  name: string;
  color: string;
  id: number;
}

async function getCars<T>(): Promise<T> {
  try {
    const response = await fetch('http://127.0.0.1:3000/garage', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default getCars;

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
    throw new Error(`Engine request failed:${error}`);
  }
}

export default sendEngineRequest;

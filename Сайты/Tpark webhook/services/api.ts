import { WebhookResponse } from '../types';

// IMPORTANT: Replace this with your actual N8N instance URL if different.
// This assumes N8N is running locally on port 5678.
// The path is the Webhook ID provided in your JSON.
const WEBHOOK_URL = '/api/n8n/webhook/ac07436f-b356-414b-bb37-2138aa032129';

export const sendMessageToAgent = async (query: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // N8N Respond to Webhook usually returns text or JSON based on configuration.
    // Based on your JSON, it returns "text" via the Respond to Webhook node.
    const textData = await response.text();
    return textData;

  } catch (error) {
    console.error("Error communicating with N8N:", error);
    return "Извините, произошла ошибка соединения с сервером поиска. Проверьте, запущен ли n8n.";
  }
};
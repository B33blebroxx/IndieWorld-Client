const endpoint = 'https://localhost:7114';

const createShow = async (promotionData) => {
  const response = await fetch(`${endpoint}/shows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  });

  if (!response.ok) {
    throw new Error('Failed to create promotion');
  }

  return response.json();
};

const updateShow = async (promotionData) => {
  const response = await fetch(`${endpoint}/shows/${promotionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  });

  if (!response.ok) {
    throw new Error('Failed to update promotion');
  }

  return response.json();
};

export { createShow, updateShow };

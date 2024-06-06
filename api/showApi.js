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

const deleteShow = async (id) => {
  const response = await fetch(`${endpoint}/shows/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete promotion');
  }
};

const getAllShows = async () => {
  const response = await fetch(`${endpoint}/shows`);
  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }

  return response.json();
};

const getAShowAndItsPerformers = async (id) => {
  const response = await fetch(`${endpoint}/shows/${id}/performers`);
  if (!response.ok) {
    throw new Error('Failed to fetch show');
  }

  return response.json();
};

export {
  createShow, updateShow, getAllShows, getAShowAndItsPerformers, deleteShow,
};

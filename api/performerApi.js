const endpoint = 'https://localhost:7114';

const addPerformerToShow = async (showId, performerId) => {
  const response = await fetch(`${endpoint}/shows/${showId}/performers/${performerId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add performer to show');
  }

  return response.json();
};

const removePerformerFromShow = async (showId, performerId) => {
  const response = await fetch(`${endpoint}/shows/${showId}/performers/${performerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove performer from show');
  }

  return response.json();
};

const getAllPerformers = async () => {
  const response = await fetch(`${endpoint}/performers`);
  if (!response.ok) {
    throw new Error('Failed to fetch performers');
  }

  return response.json();
};

export {
  addPerformerToShow, getAllPerformers, removePerformerFromShow,
};

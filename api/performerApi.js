const endpoint = 'https://localhost:7114';

const addPerformerToShow = async (showId, performerId) => {
  const response = await fetch(
    `${endpoint}/shows/${showId}/performers/${performerId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to add performer to show');
  }

  return response.json();
};

const removePerformerFromShow = async (showId, performerId) => {
  const response = await fetch(
    `${endpoint}/shows/${showId}/performers/${performerId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

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

  const data = await response.json();
  return data;
};

const getAPerformerAndTheirShows = async (id) => {
  const response = await fetch(`${endpoint}/performers/${id}/shows`);
  if (!response.ok) {
    throw new Error('Failed to fetch performer');
  }

  const data = await response.json();
  return data;
};

const createPerformer = async (performerData) => {
  const response = await fetch(`${endpoint}/performers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performerData),
  });

  if (!response.ok) {
    throw new Error('Failed to create performer');
  }

  const data = await response.json();
  return data;
};

const updatePerformer = async (performerData) => {
  const response = await fetch(`${endpoint}/performers/${performerData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performerData),
  });

  if (!response.ok) {
    throw new Error('Failed to update performer');
  }

  const data = await response.json();
  return data;
};

const getAPerformer = async (id) => {
  const response = await fetch(`${endpoint}/performers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch performer');
  }

  const data = await response.json();
  return data;
};

export {
  addPerformerToShow,
  getAllPerformers,
  removePerformerFromShow,
  getAPerformerAndTheirShows,
  createPerformer,
  updatePerformer,
  getAPerformer,
};

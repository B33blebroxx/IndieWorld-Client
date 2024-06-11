const endpoint = 'https://localhost:7114';

const getAPerformerAndTheirPics = async (performerId) => {
  const response = await fetch(`${endpoint}/performers/${performerId}/pics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get performer pics');
  }

  return response.json();
};

const getAPerformerPic = async (performerPicId) => {
  const response = await fetch(`${endpoint}/performer/pics/${performerPicId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get performer pic');
  }

  return response.json();
};

const createPerformerPic = async (performerPicData) => {
  const response = await fetch(`${endpoint}/performer/pics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performerPicData),
  });

  if (!response.ok) {
    throw new Error('Failed to create performer pic');
  }

  return response.json();
};

const deletePerformerPic = async (performerPicId) => {
  const response = await fetch(`${endpoint}/performer/pics/${performerPicId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete performer pic');
  }

  return response.json();
};

export {
  getAPerformerAndTheirPics, getAPerformerPic, createPerformerPic, deletePerformerPic,
};

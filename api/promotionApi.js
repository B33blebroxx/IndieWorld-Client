const endpoint = 'https://localhost:7114';

const createPromotion = async (promotionData) => {
  const response = await fetch(`${endpoint}/promotions`, {
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

const updatePromotion = async (promotionData) => {
  const response = await fetch(`${endpoint}/promotions/${promotionData.id}`, {
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

const getPromotion = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getAllPromotions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getAPromotionAndItsShows = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions/profile/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  createPromotion,
  updatePromotion,
  getPromotion,
  getAllPromotions,
  getAPromotionAndItsShows,
};

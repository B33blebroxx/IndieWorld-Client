const endpoint = 'https://localhost:7114';

const createPromotion = (promotionData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(new Error('Failed to create promotion'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const updatePromotion = (promotionData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions/${promotionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(new Error('Failed to update promotion'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

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

export {
  createPromotion, updatePromotion, getPromotion, getAllPromotions,
};

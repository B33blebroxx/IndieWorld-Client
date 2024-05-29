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

export { createPromotion, updatePromotion };

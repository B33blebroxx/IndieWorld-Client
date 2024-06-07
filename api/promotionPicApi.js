const endpoint = 'https://localhost:7114';

const getAPromotionAndItsPics = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions/${id}/promotionpics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getAPromotionPic = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotionpics/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createPromotionPic = async (promotionPicData) => {
  const response = await fetch(`${endpoint}/promotionpics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionPicData),
  });

  if (!response.ok) {
    throw new Error('Failed to create promotion pic');
  }

  return response.json();
};

export { getAPromotionAndItsPics, getAPromotionPic, createPromotionPic };

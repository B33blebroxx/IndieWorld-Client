const endpoint = 'https://localhost:7114';

const getAPromotionAndItsPics = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/promotions/${id}/pics`, {
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
  fetch(`${endpoint}/promotion/pics/${id}`, {
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
  const response = await fetch(`${endpoint}/promotion/pics`, {
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

const deletePromotionPic = async (promotionPicId) => {
  const response = await fetch(`${endpoint}/promotion/pics/${promotionPicId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete promotion pic');
  }
};

export {
  getAPromotionAndItsPics,
  getAPromotionPic,
  createPromotionPic,
  deletePromotionPic,
};

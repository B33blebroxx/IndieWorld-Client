const endpoint = 'https://localhost:7114';

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateUserPromotion = (id, promotionId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}/promotion`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promotionId }),
  })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(new Error('Failed to update user'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const updateUserPerformer = (id, performerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}/performer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ performerId }),
  })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(new Error('Failed to update user'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export { getUser, updateUserPromotion, updateUserPerformer };

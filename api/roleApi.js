const endpoint = 'https://localhost:7114';

const getRoles = async () => {
  const response = await fetch(`${endpoint}/roles`);
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }

  return response.json();
};

export default getRoles;

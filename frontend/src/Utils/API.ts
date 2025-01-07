export async function getAll() {
  const response = await fetch('http://localhost:3000/users');
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};

export const fetchByName = async (name: string) => {
  const response = await fetch(`http://localhost:3000/users/${name}`);
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};

export const fetchById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};


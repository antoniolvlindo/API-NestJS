import { useEffect, useState } from 'react';
import { fetchById } from '../../Utils/API';
import { useParams } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const userData = await fetchById(id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul>
        <li>Username: {user.username}</li>
        <li>First Name: {user.firstName}</li>
        <li>Last Name: {user.lastName}</li>
        <li>Email: {user.email}</li>
        <li>Status: {user.active ? 'Active' : 'Inactive'}</li>
        <li>ID: {user.id}</li>
        <li>
          <button onClick={() => {}}>Update</button>
          <button onClick={() => {}}>Delete</button>
        </li>
      </ul>
    </div>
  );
}
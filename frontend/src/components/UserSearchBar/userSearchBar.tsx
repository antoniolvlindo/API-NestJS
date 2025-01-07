import { useEffect, useState } from "react";
import DataTable from '../DataTable'
import { getAll, fetchById, fetchByName } from '../../Utils/API'
import { Navigate, useNavigate } from "react-router-dom";


export default function UserSearchbar() {
    interface User {
      index: number
      id: string;
      username: string
      firstname: string;
      lastName: string;
      email: string;
      active: boolean;
    }


    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const allUsers = await getAll();
          setUsers(allUsers);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar"
            className="h-6 bg-white w-72 text-black mr-2"
          />
          <button
            className="flex items-center justify-center bg-blue-800 text-white border-none p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        {users.map((user) => 
          <DataTable
            key={ user.id }
            id={ user.id }
            username={ user.username }
            firstName={ user.firstname }
            lastName={user.lastName}
            email={user.email}
            active={user.active ? "Active" : "Inactive"}
            onUpdate={() => console.log(`Update ${user.id}`)}
            onDetails={() => console.log(`Details ${user.id}`)}
            onDelete={() => console.log(`Delete ${user.id}`)}
          />
        )}

      </div>
    );
  }

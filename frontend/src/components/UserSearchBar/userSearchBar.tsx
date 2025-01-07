import { useEffect, useState } from "react";
import DataTable from '../DataTable'
import { getAll, fetchById, fetchByName } from '../../Utils/API'

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
      <div
        className="user-searchbar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Buscar"
          style={{ height: "24px", backgroundColor: "white", width: "300px", color: "black"}}
        />
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0c4a6e",
            color: "white",
            border: "none",
            padding: "5px 8px",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button >
        {users.map((user) => 
          <DataTable
            key={user.index}
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

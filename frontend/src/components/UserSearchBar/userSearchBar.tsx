import { useEffect, useState } from "react";

function userSearchbar() {
  function userSearchbar() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    return (
      <div
        className="user-searchbar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Buscar"
          style={{ height: "24px", backgroundColor: "white", width: "300px" }}
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
        </button>
      </div>
    );
  }
}
export default userSearchbar;

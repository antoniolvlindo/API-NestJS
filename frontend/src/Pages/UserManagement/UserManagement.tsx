import React, { useState } from 'react'
import UserSearchBar from '../../components/UserSearchBar/userSearchBar'

export default function UserManagement() {
  const [search, setSearch] = useState(false);

  const handleSearchButton = () => {
    setSearch(!search)
  };

  return (
    <div>
      <button onClick={handleSearchButton}>
        Usurários
      </button>
      <div>
      { search && <UserSearchBar /> }
      </div>
    </div>
  )
}

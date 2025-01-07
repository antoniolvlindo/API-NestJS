import React, { useState } from 'react'
import UserSearchBar from '../../components'

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
      { search && <UserSearchBar /> }
    </div>
  )
}

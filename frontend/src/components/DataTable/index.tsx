import React from 'react'
import { useNavigate } from 'react-router-dom';

interface DataTableProps {
  username: string
  firstName: string;
  lastName: string;
  active: string;
  email: string;
  id: string;
  onUpdate: () => void;
  onDetails: (id: string) => void;
  onDelete: () => void;
}

export default function DataTable({ username, lastName, firstName, email, active, id, onUpdate, onDetails, onDelete }: DataTableProps) {
  const navigate = useNavigate();
    
  const handleClick = () => {
    navigate(`/details/${id}`);
  }

  return (
    <tr>
      <td>{username}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{active}</td>
      <td>
        <button onClick={onUpdate}>Update</button>
        <button onClick={handleClick}>Details</button>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  )
}
import React from 'react'

interface DataTableProps {
  username: string
  firstName: string;
  lastName: string;
  active: string;
  email: string;
  onUpdate: () => void;
  onDetails: () => void;
  onDelete: () => void;
}

export default function index({ username, lastName, firstName, email, active, onUpdate, onDetails, onDelete }: DataTableProps) {
  return (
    <tr>
    <td>{username}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{email}</td>
    <td>{active}</td>
    <td>
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDetails}>Details</button>
      <button onClick={onDelete}>Delete</button>
    </td>
  </tr>
  )
}

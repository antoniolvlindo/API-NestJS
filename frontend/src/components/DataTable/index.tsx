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
    <div>
      <span className='username'>{username}</span>
      <span className='firstName'>{firstName}</span>
      <span className='lastName'>{lastName}</span>
      <span className='email'>{email}</span>
      <span className='active'>{active}</span>
      <button className='updateBtn' onClick={onUpdate}>Update</button>
      <button className='detailsBtn' onClick={onDetails}>Details</button>
      <button className='deleteBtn' onClick={onDelete}>Delete</button>
    </div>
  )
}

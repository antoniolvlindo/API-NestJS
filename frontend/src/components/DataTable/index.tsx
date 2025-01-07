import React from 'react'

interface DataTableProps {
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  onUpdate: () => void;
  onDetails: () => void;
  onDelete: () => void;
}

export default function index({ firstName, lastName, status, email, onUpdate, onDetails, onDelete }: DataTableProps) {
  return (
    <div>
      <span className='first name'>{firstName}</span>
      <span className='last name'>{lastName}</span>
      <span className='status'>{status}</span>
      <span className='email'>{email}</span>
      <button className='updateBtn' onClick={onUpdate}>Update</button>
      <button className='detailsBtn' onClick={onDetails}>Details</button>
      <button className='deleteBtn' onClick={onDelete}>Delete</button>
    </div>
  )
}

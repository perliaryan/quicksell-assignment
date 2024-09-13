import React, { useState } from 'react';

const AddTicketForm = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ 
      id: Date.now().toString(),
      title, 
      priority,
      status: 'Todo',
      userId: null, // Assign a user if needed
      tag: ['Feature Request'] // Default tag
    });
    onClose();
  };

  return (
    <div className="add-ticket-form">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Ticket title" 
          required 
        />
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          <option value={0}>No priority</option>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
          <option value={4}>Urgent</option>
        </select>
        <button type="submit">Add Ticket</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTicketForm;
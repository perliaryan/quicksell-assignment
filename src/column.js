import React, { useState } from 'react';
import Card from './card';
import AddTicketForm from './AddTicketForm';

const iconMap = {
  'Todo': '/icons_FEtask/To-do.svg',
  'In progress': '/icons_FEtask/inprogress.svg',
  'Done': '/icons_FEtask/Done.svg',
  'Backlog': '/icons_FEtask/Backlog.svg',
  'Cancelled': '/icons_FEtask/Cancelled.svg',
  'Low': "/icons_FEtask/Img - Low Priority.svg",
  "No priority": "/icons_FEtask/No-priority.svg",
  'Medium': "/icons_FEtask/Img - Medium Priority.svg",
  'High': "/icons_FEtask/Img - High Priority.svg",
  'Urgent': "/icons_FEtask/SVG - Urgent Priority colour.svg"
};

const Column = ({ name, tickets, grouping, users, onDrop, onAddTicket, onRemoveTicket }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTicket = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(droppedTicket, name);
  };

  const handleAddTicket = (newTicket) => {
    onAddTicket({ ...newTicket, status: name });
    setShowAddForm(false);
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="column-header">
        <div className="column-header-left">
          <img src={iconMap[name] || '/icons_FEtask/placeholder-icon.svg '} alt={name} className="column-icon" />
          <h2 className="column-title">{name}</h2>
          <span className="column-count">{tickets.length}</span>
        </div>
        <div className="column-header-right">
          <button className="add-button" onClick={() => setShowAddForm(true)}>
            <img src="/icons_FEtask/add.svg" alt="Add" />
          </button>
          <button className="options-button" onClick={() => setShowOptions(!showOptions)}>
            <img src="/icons_FEtask/3 dot menu.svg" alt="Options" />
          </button>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={() => {/* Implement sort functionality */}}>Sort</button>
              <button onClick={() => {/* Implement hide functionality */}}>Hide</button>
            </div>
          )}
        </div>
      </div>
      {showAddForm && (
        <AddTicketForm onAdd={handleAddTicket} onClose={() => setShowAddForm(false)} />
      )}
      {tickets.map(ticket => (
        <Card 
          key={ticket.id} 
          ticket={ticket} 
          grouping={grouping} 
          users={users} 
          onRemove={() => onRemoveTicket(ticket.id)}
        />
      ))}
    </div>
  );
};

export default Column;
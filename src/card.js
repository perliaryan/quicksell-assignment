import React from 'react';

const priorityIcons = {
  0: '/icons_FEtask/No-priority.svg',
  1: '/icons_FEtask/Img - Low Priority.svg',
  2: '/icons_FEtask/Img - Medium Priority.svg',
  3: '/icons_FEtask/Img - High Priority.svg',
  4: '/icons_FEtask/SVG - Urgent Priority colour.svg'
};

const statusIcons = {
  'Todo': '/icons_FEtask/To-do.svg',
  'In progress': '/icons_FEtask/inprogress.svg',
  'Done': '/icons_FEtask/Done.svg',
  'Backlog': '/icons_FEtask/Backlog.svg',
  'Cancelled': '/icons_FEtask/Cancelled.svg'
};

const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

const Card = ({ ticket, grouping, users, onRemove }) => {
  const user = users.find(u => u.id === ticket.userId);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(ticket));
  };

  return (
    <div className="card" draggable="true" onDragStart={handleDragStart}>
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        {grouping !== 'status' && (
          <img 
            src={statusIcons[ticket.status]} 
            alt={ticket.status} 
            className="status-icon" 
            title={ticket.status}
          />
        )}
        <button className="remove-button" onClick={onRemove}>×</button>
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
        {grouping !== 'priority' && (
          <img 
            src={priorityIcons[ticket.priority]} 
            alt={priorityNames[ticket.priority]} 
            className="priority-icon" 
            title={priorityNames[ticket.priority]}
          />
        )}
        {grouping !== 'user' && (
          <div 
            className="user-avatar" 
            title={user ? `${user.name} (${user.available ? 'Online' : 'Offline'})` : 'Unassigned'}
            style={{backgroundColor: user?.available ? '#00FF00' : '#FF0000'}}
          >
            {user ? user.name[0].toUpperCase() : 'U'}
          </div>
        )}
        <span className="card-tag">
          <img src="/icons_FEtask/tag.svg" alt="Tag" className="tag-icon" />
          {ticket.tag}
        </span>
      </div>
    </div>
  );
};

export default Card;
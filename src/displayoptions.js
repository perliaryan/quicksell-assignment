import React, { useState } from 'react';

const DisplayOptions = ({ onDisplayChange, grouping, sorting }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupingChange = (e) => {
    onDisplayChange(e.target.value, sorting);
    setIsOpen(false);
  };

  const handleSortingChange = (e) => {
    onDisplayChange(grouping, e.target.value);
    setIsOpen(false);
  };

  return (
    <div className="display-options">
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/icons_FEtask/Display.svg" alt="Display" style={{ marginRight: '5px' }} />
        Display
      </button>
      {isOpen && (
        <div className="options-menu">
          <div>
            <label>Grouping</label>
            <select value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label>Ordering</label>
            <select value={sorting} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
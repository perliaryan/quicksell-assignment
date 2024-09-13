import React, { useState, useEffect } from 'react';
import Column from '../column';
import DisplayOptions from '../displayoptions';
import { groupTickets, sortTickets } from '../grouping-sorting-logic';
import { fetchTickets } from '../api/ticketApi';

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  const handleDisplayChange = (newGrouping, newSorting) => {
    setGrouping(newGrouping);
    setSorting(newSorting);
  };

  const handleDrop = (ticket, newStatus) => {
    const updatedTickets = tickets.map(t => 
      t.id === ticket.id ? { ...t, status: newStatus } : t
    );
    setTickets(updatedTickets);
  };

  const handleAddTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  const handleRemoveTicket = (ticketId) => {
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  const groupedTickets = groupTickets(tickets, grouping, users);
  const groupedAndSortedTickets = sortTickets(groupedTickets, sorting);

  return (
    <div className="board">
      <DisplayOptions onDisplayChange={handleDisplayChange} grouping={grouping} sorting={sorting} />
      <div className="columns">
        {Object.entries(groupedAndSortedTickets).map(([columnName, columnTickets]) => (
          <Column 
            key={columnName} 
            name={columnName} 
            tickets={columnTickets} 
            grouping={grouping} 
            users={users}
            onDrop={handleDrop}
            onAddTicket={handleAddTicket}
            onRemoveTicket={handleRemoveTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
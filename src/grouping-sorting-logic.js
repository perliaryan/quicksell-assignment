export const groupTickets = (tickets, grouping, users) => {
  switch (grouping) {
    case 'status':
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {"Todo":[],"In progress":[],"Backlog":[],"Done":[],"Cancelled":[]});
    case 'user':
      return tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        (acc[userName] = acc[userName] || []).push(ticket);
        return acc;
      }, {});
    case 'priority':
      const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      return tickets.reduce((acc, ticket) => {
        const priorityName = priorityNames[ticket.priority] || 'Unknown';
        (acc[priorityName] = acc[priorityName] || []).push(ticket);
        return acc;
      }, {});
    default:
      return { 'All Tickets': tickets };
  }
};

export const sortTickets = (groupedTickets, sorting) => {
  const sortFunction = sorting === 'priority' 
    ? (a, b) => b.priority - a.priority
    : (a, b) => a.title.localeCompare(b.title);

  return Object.entries(groupedTickets).reduce((acc, [key, value]) => {
    acc[key] = value.sort(sortFunction);
    return acc;
  }, {});
};
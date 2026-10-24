import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="ticket-list">
      <h2>Ticket Categories</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <h3>{ticket.name}</h3>
            <p>{ticket.description}</p>
            <p>Price: £{ticket.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;

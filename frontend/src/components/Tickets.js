import React, { useEffect, useState } from 'react';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickets(data.tickets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="tickets">
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.name}>
            <div className="ticket-info">
              <h3>{ticket.name}</h3>
              <p>Price: £{ticket.price.toFixed(2)}</p>
              <p>Availability: {ticket.availability}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;

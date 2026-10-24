import React, { useState } from 'react';
import '../styles.css';

const BookingForm = () => {
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = {
      tickets: Array.from(formData.entries()).reduce((acc, [name, value]) => {
        acc.push({ name, quantity: parseInt(value, 10) });
        return acc;
      }, []);
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await response.json();
      if (data.booking) {
        setErrors([]);
        alert(`Booking reference: ${data.booking.reference}`);
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error('Failed to book tickets:', error);
      setErrors([{ field: 'unknown', message: 'An unknown error occurred.' }]);
    }
  };

  React.useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket.name} className="ticket-form">
          <label htmlFor={ticket.name}>{ticket.name}</label>
          <input
            type="number"
            id={ticket.name}
            name={ticket.name}
            min="0"
            max={ticket.availability}
            value={ticket.quantity || ''}
            onChange={e => setTickets(tickets.map(t => (t.name === ticket.name ? { ...t, quantity: parseInt(e.target.value, 10) } : t)))}
          />
        </div>
      ))}
      <div className="total">
        <h3>Total: £{tickets.reduce((acc, t) => acc + (t.price * (t.quantity || 0)), 0)}</h3>
      </div>
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;

import React, { useState } from 'react';
import styles from '../styles.css';

const BookingForm = () => {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleTicketChange = (ticketName, quantity) => {
    const newTickets = selectedTickets.map(t => {
      if (t.name === ticketName) {
        return { ...t, quantity };
      }
      return t;
    });
    setSelectedTickets(newTickets);
    setTotalPrice(calculateTotal(newTickets));
  };

  const calculateTotal = (tickets) => {
    return tickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tickets: selectedTickets })
    });
    const data = await response.json();
    if (response.ok) {
      alert(`Booking successful. Reference: ${data.booking.reference}`);
    } else {
      alert(data.errors.map(e => `${e.field}: ${e.message}`).join('\n'));
    }
  };

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit}>
      <h2>Select Your Tickets</h2>
      {selectedTickets.map(ticket => (
        <div key={ticket.name} className={styles.ticket}>
          <label htmlFor={ticket.name}>{ticket.name}</label>
          <input
            type="number"
            id={ticket.name}
            value={ticket.quantity}
            onChange={e => handleTicketChange(ticket.name, parseInt(e.target.value))}
          />
        </div>
      ))}
      <div className={styles.total}>
        <p>Total: £{totalPrice.toFixed(2)}</p>
      </div>
      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;

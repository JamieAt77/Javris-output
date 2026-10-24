import React, { useState } from 'react';
import '../styles/global.css';

const TicketForm = ({ ticket }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const booking = {
      name,
      email,
      tickets: quantity,
      price: ticket.price * quantity
    };
    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
      .then(response => response.json())
      .then(data => {
        if (data.booking) {
          alert(`Booking successful. Reference: ${data.booking.id}`);
        } else {
          alert('Booking failed.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your booking.');
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="ticket-form">
      <label htmlFor="name" className="form-label">Name:</label>
      <input
        type="text"
        id="name"
        className="form-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="email"
        id="email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="quantity" className="form-label">Quantity:</label>
      <input
        type="number"
        id="quantity"
        className="form-input"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      <button type="submit" className="form-button">Book Ticket</button>
    </form>
  );
};

export default TicketForm;

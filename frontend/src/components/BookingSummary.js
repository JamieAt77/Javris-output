import React from 'react';
import styles from '../styles.css';

const BookingSummary = ({ booking }) => {
  return (
    <div className={styles.bookingSummary}>
      <h2>Booking Details</h2>
      <p>Reference: {booking.booking.reference}</p>
      <table>
        <thead>
          <tr>
            <th>Ticket Type</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {booking.booking.tickets.map(ticket => (
            <tr key={ticket.name}>
              <td>{ticket.name}</td>
              <td>{ticket.quantity}</td>
              <td>£{ticket.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingSummary;

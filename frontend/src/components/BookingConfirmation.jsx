import React, { useState } from 'react';
import { useApi } from '../services/api';

const BookingConfirmation = ({ booking }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { api, error } = useApi();

  if (error) {
    return <div className="error">An error occurred: {error.message}</div>;
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="booking-confirmation">
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking, {booking.name}!</p>
      <p>Your booking reference is: <strong>{booking.id}</strong></p>
      <button onClick={handleShowDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="booking-details">
          <p>Email: {booking.email}</p>
          <p>Tickets: {booking.tickets}</p>
          <p>Total Price: £{booking.price.toFixed(2)}</p>
          <p>Timestamp: {new Date(booking.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;

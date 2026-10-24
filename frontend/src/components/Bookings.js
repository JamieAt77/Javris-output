import React, { useEffect, useState } from 'react';
import { fetchBookings } from "../services/api.js";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const bookingsData = await fetchBookings();
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookingsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.map((booking, index) => (
        <div key={index} className="booking">
          <h3>Booking Reference: {booking.reference}</h3>
          <ul>
            {booking.tickets.map((ticket, ticketIndex) => (
              <li key={ticketIndex}>
                {ticket.name} x {ticket.quantity} - £{ticket.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Bookings;

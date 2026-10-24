import React, { useState, useEffect } from 'react';
import Tickets from './components/Tickets';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import Bookings from './components/Bookings';
import './styles.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
    fetchBookings();
  }, []);

  const handleBookingSubmit = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }
      const data = await response.json();
      setBooking(data.booking);
      setErrors(data.errors);
      setBookings([...bookings, data.booking]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Isca Augusta Baths Booking System</h1>
      <Tickets tickets={tickets} />
      <BookingForm onBookingSubmit={handleBookingSubmit} />
      {booking.length > 0 && (
        <BookingSummary booking={booking} />
      )}
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error.message}
            </p>
          ))}
        </div>
      )}
      <Bookings bookings={bookings} />
    </div>
  );
};

export default App;

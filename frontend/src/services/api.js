import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const tickets = await response.json();
        setData(tickets);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};

const useBookTicket = (booking) => {
  const [confirmation, setConfirmation] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const bookTicket = async (booking) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const bookingConfirmation = await response.json();
      setConfirmation(bookingConfirmation);
    } catch (err) {
      setBookingError(err.message);
    }
  };

  return { bookTicket, confirmation, bookingError };
};

export { useFetch, useBookTicket };

import express from 'express';
import ticketsRouter from "../frontend/src/components/Tickets.js";
import bookingsRouter from "./bookings.js";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/tickets', ticketsRouter);
app.use('/api/book', bookingsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

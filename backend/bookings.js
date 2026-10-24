import express from 'express';
import { json } from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'node:crypto';

const router = express.Router();
const bookings = [];

router.use(json());

router.post('/api/bookings', (req, res) => {
  const { name, email, tickets } = req.body;
  const booking = {
    id: crypto.randomUUID(),
    name,
    email,
    tickets,
    price: tickets * 15, // Assuming a ticket price of £15
    timestamp: new Date().toISOString()
  };
  bookings.push(booking);
  res.status(201).json({ booking });
});

export default router;

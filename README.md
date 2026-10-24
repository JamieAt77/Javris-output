# Isca Augusta Baths Ticket Booking System

## Overview
This project is a full-stack ticket booking application for the Isca Augusta Baths visitor attraction. The system allows visitors to view ticket types, select a visit date, purchase tickets, and view their booking history. The application is structured with a React + Vite frontend and a Node.js + Express backend. It uses plain CSS for styling and stores data in JSON files on disk.

## Project Structure
- `backend/`: Contains the Express backend and related files.
- `frontend/`: Contains the React frontend and related files.

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install the required dependencies:
   ```sh
   npm install
   ```
3. Set environment variables in `.env` (based on `.env.example`):
   ```sh
   cp .env.example .env
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:4000` (or another port specified in `.env`).

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install the required dependencies:
   ```sh
   npm install
   ```
3. Set environment variables in `.env` (based on `.env.example`):
   ```sh
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another port specified in `.env`).

## API Endpoints

### GET /api/tickets
- **Description**: Retrieve the list of available tickets and their prices.
- **Response**:
  ```json
  {
    "tickets": [
      { "name": "Day Pass", "price": 10, "availability": 50 },
      { "name": "Weekend Pass", "price": 15, "availability": 30 }
    ]
  }
  ```

### POST /api/book
- **Description**: Submit a booking request.
- **Request**:
  ```json
  {
    "tickets": [
      { "name": "Day Pass", "quantity": 2 }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "booking": {
      "reference": "ABC123",
      "tickets": [
        { "name": "Day Pass", "quantity": 2, "price": 20 }
      ]
    },
    "errors": []
  }
  ```

### GET /api/bookings
- **Description**: Retrieve the list of bookings for the current user.
- **Response**:
  ```json
  {
    "bookings": [
      {
        "reference": "ABC123",
        "tickets": [
          { "name": "Day Pass", "quantity": 2, "price": 20 }
        ]
      }
    ]
  }
  ```

## Error Handling
- The backend validates input and returns error messages in the `errors` array of the response.
- The frontend displays error messages to the user if any are returned from the API.

## Data Storage
- Ticket data is stored in `backend/tickets.json`.
- Booking data is stored in `backend/bookings.json`.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing
Contributions are welcome! Please follow the guidelines in the `CONTRIBUTING.md` file.

## Contact
For any questions or issues, please contact Jamie Atkinson at j.atkinson@example.com.
# Javris-output

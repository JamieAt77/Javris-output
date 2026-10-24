
const ticketsData = [
  {
    name: 'Adult',
    description: 'Full access to all areas',
    price: 15
  },
  {
    name: 'Child',
    description: 'Access to kiddie pool',
    price: 10
  },
  {
    name: 'Senior',
    description: 'Discounted rate for seniors',
    price: 12
  }
];

export const getTickets = async () => {
  return {
    tickets: ticketsData
  };
};

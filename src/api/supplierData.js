import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL SUPPLIERS
const getSuppliers = () =>
  new Promise((resolve, reject) => {
    console.log('Fetching from:', `${endpoint}/suppliers`); // Debug log
    fetch(`${endpoint}/suppliers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Response status:', response.status); // Debug log
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Debug log
        resolve(Object.values(data));
      })
      .catch((error) => {
        console.error('API Error:', error); // Debug log
        reject(error);
      });
  });

// GET A SINGLE SUPPLIER
const getSingleSupplier = (id) =>
  new Promise((resolve, reject) => {
    console.log('Fetching single supplier from:', `${endpoint}/suppliers/${id}`); // Debug log
    fetch(`${endpoint}/suppliers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Single supplier response status:', response.status); // Debug log
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Single supplier data:', data); // Debug log
        resolve(data);
      })
      .catch((error) => {
        console.error('Single supplier API Error:', error); // Debug log
        reject(error);
      });
  });

export { getSuppliers, getSingleSupplier };

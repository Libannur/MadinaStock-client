import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL INVENTORY ITEMS
const getInventoryItems = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/inventory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET A SINGLE INVENTORY ITEM
const getSingleInventoryItem = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/inventory/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE INVENTORY ITEM
const createInventoryItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE INVENTORY ITEM
const updateInventoryItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/inventory/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE INVENTORY ITEM
const deleteInventoryItem = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getInventoryItems, getSingleInventoryItem, createInventoryItem, updateInventoryItem, deleteInventoryItem };

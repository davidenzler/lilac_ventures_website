import React, { useState, useEffect } from 'react';
import { Client } from './types';
import './AdminTable.css';

// fetchClients function merged into this file
const fetchClients = async (): Promise<Client[]> => {
  const response = await fetch('/clientInfoUpdate/');
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  return response.json();
};

interface AdminTableProps {
  clients?: Client[];
}

const AdminTable: React.FC<AdminTableProps> = ({ clients: propClients }) => {
  const [clients, setClients] = useState<Client[]>(propClients || []);

  useEffect(() => {
    if (!propClients) {
      fetchClients()
        .then((data: Client[]) => setClients(data))
        .catch((error: Error) => console.error('Error fetching clients:', error));
    }
  }, [propClients]);

  return (
    <div className="main-content">
      <h2>Current Clients</h2>

      <table className="clients-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Marital Status</th>
            <th>Employment Status</th>
            <th>Progress Step</th>
            <th>Account Link</th>
            <th><button>Delete</button></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.address}</td>
              <td>{client.mobileNumber}</td>
              <td>{client.email}</td>
              <td>{client.maritalStatus}</td>
              <td>{client.employmentStatus}</td>
              <td>{client.progressStep}</td>
              <td>{client.accountLink}</td>
              <td><button id="del-btn">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;

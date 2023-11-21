import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTable.css';

// Assuming the Client type is defined elsewhere, import it here
// import { Client } from './types';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  address: Address | string;
  mobileNumber: string;
  email: string;
  maritalStatus: string;
  employmentStatus: string;
  progressStep: string;
  accountLink: string;
}

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

  const fetchClients = async (): Promise<Client[]> => {
    try {
      const response = await axios.get('http://localhost:8080/clientInfoUpdate/');
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw new Error('Failed to fetch clients');
    }
  };

  // Helper function to format the address
  const formatAddress = (address: Address | string | undefined) => {
    if (!address) {
      return 'No Address Provided';
    }
  
    if (typeof address === 'string') {
      return address;
    }
  
    if (address.street && address.city && address.state && address.zip) {
      return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    }
  
    return 'Incomplete Address';
  };

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
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{formatAddress(client.address)}</td>
              <td>{client.mobileNumber}</td>
              <td>{client.email}</td>
              <td>{client.maritalStatus}</td>
              <td>{client.employmentStatus}</td>
              <td>{client.progressStep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;

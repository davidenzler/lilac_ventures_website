// using React-table

// table requirements: 
// first name, last name, address, mobile number, marital status, employment status
// progress step

import React, { useState, useEffect } from 'react';
import { Client } from './types';
import './AdminTable.css';

interface AdminTableProps {
  clients?: Client[];
}

const AdminTable: React.FC<AdminTableProps> = ({ clients: propClients }) => {
  const [clients, setClients] = useState<Client[]>(propClients || []);

  useEffect(() => {
    if (!propClients) {
      // Sample data hard-coded until api is hooked up
      const sampleData: Client[] = [
        {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St, Springfield",
          mobileNumber: "123-456-7890",
          maritalStatus: "Single",
          employmentStatus: "Employed",
          progressStep: "Step 3"
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          address: "456 Elm St, Shelbyville",
          mobileNumber: "987-654-3210",
          maritalStatus: "Married",
          employmentStatus: "Self-Employed",
          progressStep: "Step 2"
        },
        {
          firstName: "Fred",
          lastName: "Ebenezer",
          address: "322 Maple St, Roseville",
          mobileNumber: "957-634-3330",
          maritalStatus: "Single",
          employmentStatus: "Unemployed",
          progressStep: "Step 5"
        },
      ];

      setClients(sampleData);
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
            <th>Marital Status</th>
            <th>Employment Status</th>
            <th>Progress Step</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.address}</td>
              <td>{client.mobileNumber}</td>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTable.css';

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
  city: string,
  street: string,
  state: string,
  zip: string,
  phone: string;
  email: string;
  marital: string;
  employment: string;
  progress: string;
  accountLink: string;
}

interface AdminTableProps {
  clients?: Client[];
}

const AdminTable: React.FC<AdminTableProps> = ({ clients: propClients }) => {
  const [clients, setClients] = useState<Client[]>(propClients || []);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (!propClients) {
      fetchClients()
        .then((data: Client[]) => setClients(data))
        .catch((error: Error) => console.error('Error fetching clients:', error));
    }
  }, [propClients, refreshFlag]);

  const fetchClients = async (): Promise<Client[]> => {
    try {
      const response = await axios.get('http://localhost:8080/clientInfoUpdate/');
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw new Error('Failed to fetch clients');
    }
  };

  async function getClientIDByEmail(email: any) {
    try {
      const response = await axios.get(`http://localhost:8080/customerProgress/getID/${email}`);
      const id = response.data.id; // Assuming the response contains an "id" property
      //console.log(id)
      return id;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching client ID:', error);
      //throw error; // Re-throw the error to be handled by the calling function
    }
  }

  const handleIncrease = async (email: string, progress: string) => {
    //console.log(`Increased for email: ${email}`);
    try {
      const id = await getClientIDByEmail(email);
      //console.log(id);

      const currentProgress = progress;
      await axios.put(`http://localhost:8080/customerProgress/${id}`, { "progress": currentProgress + 1 });
      setRefreshFlag(prevFlag => !prevFlag);
    } catch (error) {
      // Handle errors here
      console.error('Error in handleIncrease:', error);
    }
  };
  

  const handleDecrease = async (email: string, progress: any) => {
    //console.log(`Decreased for email: ${email}`);
    try {
      const id = await getClientIDByEmail(email);
      //console.log(id);

      const currentProgress = progress;
      await axios.put(`http://localhost:8080/customerProgress/${id}`, { "progress": currentProgress - 1 });
      setRefreshFlag(prevFlag => !prevFlag);
    } catch (error) {
      // Handle errors here
      console.error('Error in handleIncrease:', error);
    }
  };

  // Helper function to format the address
  const formatAddress = (street:string, city:string, state:string, zip:string) => {
    if (street && city && state && zip) {
      return `${street}, ${city}, ${state} ${zip}`;
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
              <td>{formatAddress(client.street, client.city, client.state, client.zip)}</td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>{client.marital}</td>
              <td>{client.employment}</td>
              <td>
                {client.progress}
                <button onClick={() => handleIncrease(client.email, client.progress)} className="green-button-adminTable">↑</button>
                <button onClick={() => handleDecrease(client.email, client.progress)} className="red-button-adminTable">↓</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

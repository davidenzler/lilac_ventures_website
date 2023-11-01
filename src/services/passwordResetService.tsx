import axios from 'axios';

const API_URL = 'https://api.example.com/password-reset';

export async function resetPassword(username: string, oldPass: string, newPass:string ) {
  try {
    const response = await axios.post(`${API_URL}/resetPassword`, {
      username,
      oldPass,
      newPass,
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
}
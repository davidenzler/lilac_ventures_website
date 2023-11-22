import axios from 'axios';

export async function register(email: string, password: string) {
        try{
            const response = await axios.post('http://127.0.0.1:8080/register', {
               email,
               password

            });
            return response.data;
        } catch (error){
            throw error;
        }
}


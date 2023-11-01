import axios from 'axios';

export async function register(firstName: string, lastName: string, 
    email: string, phone: number, street: string, city: string, state: string,
    zip: number, marital: string, employment: string, cPreference: string) {
        try{
            const response = await axios.post('http://127.0.0.1:8080/register', {
                firstName, 
                lastName,
                email,
                phone, 
                street,
                city, 
                state, 
                zip,
                marital,
                employment, 
                cPreference
            });
            return response.data;
        } catch (error){
            throw error;
        }
    }


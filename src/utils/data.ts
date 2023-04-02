import axios from 'axios';
import { FormData, User } from './types';

const API_GET = 'https://randomuser.me/api/?inc=name,email';
const API_POST = 'https://acc-test-vjn7.onrender.com/form';

export const getRandomUser = async (): Promise<User> => {
    const response = await axios.get(API_GET);
    const data = response.data.results[0];
    return data;
};

export const postUser = async (formData: FormData): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'letmein',
    };
    await axios.post(API_POST, formData, { headers });
};

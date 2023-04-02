import axios from 'axios';
import { FormData, User } from './types';

const API_GET = 'https://randomuser.me/api/';
const API_POST = 'https://acc-test-vjn7.onrender.com/form';

export const getRandomUser = async (): Promise<User> => {
    const response = await axios.get(`${API_GET}?inc=name,email`);
    const data = response.data.results[0];
    return data;
};

export const postUser = async (formData: FormData): Promise<void> => {
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
    };
    await axios.post(API_POST, formData, { headers });
};

import type { ChangeEvent, FormEvent } from 'react';
import type { FormData, User } from './utils/types';
import { useEffect, useState } from 'react';
import './App.css';
import { getRandomUser, postUser } from './utils/data';

function App() {
    const [userData, setUserData] = useState<User>();
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        car: '',
        purchasedate: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const user = await getRandomUser();
            setUserData(user);
        };
        fetchData();
    }, []);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...formData,
            firstname: userData?.name.first,
            lastname: userData?.name.last,
            email: userData?.email,
        };

        try {
            await postUser(payload);
            alert('User created successfully');
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = () => {
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            car: '',
            purchasedate: '',
        });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={userData.name.first}
                    onChange={handleInputChange}
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={userData.name.last}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="cars">Car</label>
                <select
                    name="car"
                    id="car"
                    value={formData.car}
                    onChange={handleInputChange}
                >
                    <option value="">Select a car</option>
                    <option value="Golf">Golf</option>
                    <option value="Arteon">Arteon</option>
                    <option value="Tiguan">Tiguan</option>
                </select>
                <label htmlFor="purchaseDate">Purchase Date</label>
                <input
                    type="date"
                    name="purchasedate"
                    id="purchasedate"
                    min="2018-01-01"
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;

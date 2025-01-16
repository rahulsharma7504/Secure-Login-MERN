import axios from 'axios';
import { useState } from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5000/register', { email, password }, { withCredentials: true });
            alert("Register successful");

        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Register</button>
        </div>
    );
}

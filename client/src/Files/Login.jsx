import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../context/Authcontext';
import{useNavigate, NavLink} from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {fetchUser}=useAuth() 
    const navigate = useNavigate();

        const useAuthentication=()=> useContext(AuthContext)
        const {loading}=useAuthentication();

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
            alert("Login successful");
        fetchUser();

            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

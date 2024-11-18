import { useAuth } from '../context/Authcontext';

function Dashboard() {
    const { user, loading, logout } = useAuth();

    if (loading) return <p>Loading...</p>;

    return (  
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Email: {user?.email}</p>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;

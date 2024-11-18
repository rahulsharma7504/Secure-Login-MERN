import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Login from './Files/Login';
import Dashboard from './Files/Dashboard';
import Register from './Files/Register';
import { AuthProvider } from './context/Authcontext';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
    </Router>
    
    </>
  );
}

export default App;

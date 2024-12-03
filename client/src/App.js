import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Login from './Files/Login';
import Dashboard from './Files/Dashboard';
import Register from './Files/Register';
import { AuthProvider } from './context/Authcontext';
import FormikForm from './Files/FormikForm';
import ImageUploadForm from './Files/ImageValidate';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/test" element={<FormikForm />} />
        <Route path="/image" element={<ImageUploadForm />} />
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

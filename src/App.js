import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './widgets/navbar';
import { loginCheck } from './app/data/slice';
import UserDashboard from './pages/user/dashboard';
import AddProduct from './pages/admin/addProduct';

function App() {
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(loginCheck());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} >
          <Route path="/admin/dashboard/add" element={<AddProduct />} />
        </Route>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

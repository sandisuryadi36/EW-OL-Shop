import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './widgets/navbar';
import { loginCheck } from './app/data/slice';
import UserDashboard from './pages/user/dashboard';
import AddProduct from './pages/admin/addProduct';
import Spinner from './component/spinner';
import EditProduct from './pages/admin/editProduct';
import ListProduct from './pages/admin/listProduct';
import Overview from './pages/admin/overview';
import DetailProduct from './pages/detailProduct';

function App() {
  const dispatch = useDispatch();
  const logedIn = useSelector(state => state.slice.logedIn);
  const status = useSelector(state => state.slice.status);
  const user = useSelector(state => state.slice.userData);

  useEffect(() => { 
    if (status === "idle") {
      dispatch(loginCheck());
    }
  }, [dispatch, status]);

  function ProtectedRoute(props) {
  const location = useLocation();
    if (status === "fulfilled") { 
      if (!logedIn) {
        return <Navigate to="/login" replace state={{from: location}} />
      }

      if (!(user.role === props.role)) {
        return <Navigate to="/" replace />
      }
      return props.children
    }
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } >
          <Route path="/admin/dashboard/" element={<Overview />} />
          <Route path="/admin/dashboard/add" element={<AddProduct />} />
          <Route path="/admin/dashboard/list" element={<ListProduct />} />
          <Route path="/admin/dashboard/list/edit/:id" element={<EditProduct />} />
          <Route path="/admin/dashboard/list/detail/:id" element={<DetailProduct />} />
        </Route>

        <Route path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

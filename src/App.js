import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './widgets/navbar';
import UserDashboard from './pages/user/dashboard';
import AddProduct from './pages/admin/addProduct';
import Spinner from './component/spinner';
import EditProduct from './pages/admin/editProduct';
import ListProduct from './pages/admin/listProduct';
import Overview from './pages/admin/overview';
import DetailProduct from './pages/detailProduct';
import SearchBar from './widgets/searchBar';
import RouteChangeListener from './widgets/routeChangeListener';

function App() {
  const logedIn = useSelector(state => state.slice.logedIn);
  const status = useSelector(state => state.slice.status);
  const loading = useSelector(state => state.slice.loading);
  const user = useSelector(state => state.slice.userData);

  function ProtectedRoute(props) {
    const location = useLocation();
    if ((status === "fulfilled")&&(!loading)) {
      if (!logedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />
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
      {loading && <Spinner />}
      <RouteChangeListener />
      <Navbar />
      <div className='container'>
        <SearchBar placeholder="Search..." className="rounded-3 mt-3" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<DetailProduct className="pt-4" />} />
          <Route path="/search/:keyword" element={<Home />} />

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
      </div>
    </BrowserRouter >
  );
}

export default App;

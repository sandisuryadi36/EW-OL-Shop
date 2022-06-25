import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './widgets/navbar';
import AddProduct from './pages/admin/addProduct';
import EditProduct from './pages/admin/editProduct';
import ListProduct from './pages/admin/listProduct';
import DetailProduct from './pages/detailProduct';
import RouteChangeListener from './widgets/routeChangeListener';
import Cart from './pages/user/cart';
import PageNotFound from './pages/404';
import AddressList from './pages/user/address/addressList';
import Checkout from './pages/user/checkout';
import UserOrder from './pages/user/order';
import OrderDetail from './pages/user/order/orderDetail';
import Register from './pages/register';
import Footer from './widgets/footer';
import Search from './pages/search';
import Spinner from './component/spinner';
import UserProfile from './pages/user/profile';
import AdminProfile from './pages/admin/profile';
import ManageCategory from './pages/admin/manageCategory';

function App() {
  const logedIn = useSelector(state => state.slice.logedIn);
  const status = useSelector(state => state.slice.status);
  const loading = useSelector(state => state.slice.loading);
  const user = useSelector(state => state.slice.userData);

  function ProtectedRoute(props) {
    const location = useLocation();
    if ((status === "fulfilled")) {
      if (!logedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />
      }

      if (!(user.role === props.role)) {
        return <Navigate to="/" replace />
      }
      return props.children
    }
  }

  return (
    <BrowserRouter>
      <RouteChangeListener />
      <Navbar />
      {loading && <Spinner />}
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/product" element={<Search />} />

          <Route path="/admin"
            element={
              <ProtectedRoute role="admin">
                <div className='pt-3'>
                  <Outlet />
                </div>
              </ProtectedRoute>
            } >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add" element={<AddProduct />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/list" element={<ListProduct />} />
            <Route path="/admin/categories" element={<ManageCategory />} />
            <Route path="/admin/list/edit/:id" element={<EditProduct />} />
          </Route>

          <Route path="/user"
            element={
              <ProtectedRoute role="user">
                <div className='pt-3'>
                  <Outlet />
                </div>
              </ProtectedRoute>
            } >
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/checkout" element={<Checkout />} />
            <Route path="/user/order/" element={<UserOrder />} />
            <Route path="/user/order/:id" element={<OrderDetail />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/address" element={<AddressList />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter >
  );
}

export default App;

import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './widgets/navbar';
import UserDashboard from './pages/user/dashboard';
import AddProduct from './pages/admin/addProduct';
import EditProduct from './pages/admin/editProduct';
import ListProduct from './pages/admin/listProduct';
import Overview from './pages/admin/overview';
import DetailProduct from './pages/detailProduct';
import RouteChangeListener from './widgets/routeChangeListener';
import Cart from './pages/user/cart';
import UserOverview from './pages/user/overview';
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

          <Route path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } >
            <Route path="/admin/dashboard/" element={<Overview />} />
            <Route path="/admin/dashboard/add" element={<AddProduct />} />
            <Route path="/admin/dashboard/profile" element={<AdminProfile />} />
            <Route path="/admin/dashboard/list" element={<ListProduct />} />
            <Route path="/admin/dashboard/list/edit/:id" element={<EditProduct />} />
            <Route path="/admin/dashboard/list/detail/:id" element={<DetailProduct />} />
          </Route>

          <Route path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            } >
            <Route path="/user/dashboard/" element={<UserOverview />} />
            <Route path="/user/dashboard/address" element={<AddressList />} />
            <Route path="/user/dashboard/profile" element={<UserProfile />} />
          </Route>
          <Route path="/user"
            element={
              <ProtectedRoute role="user">
                <Outlet />
              </ProtectedRoute>
            } >
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/checkout" element={<Checkout />} />
            <Route path="/user/order/" element={<UserOrder />} />
            <Route path="/user/order/:id" element={<OrderDetail />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter >
  );
}

export default App;

import React, { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { Routes, Route } from 'react-router-dom'
import 'quill/dist/quill.snow.css'
import MainLayout from './MainLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Shop from './pages/Shop'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import ProductList from './pages/admin/ProductList'
import AddProduct from './pages/admin/AddProduct'
import UpdateBlog from './pages/admin/UpdateBlog'
import AdminOrders from './pages/admin/AdminOrders'
import WishlistProducts from './pages/admin/WishlistProducts'
import Reviews from './pages/admin/Reviews'
import AdminLogin from './pages/admin/AdminLogin'
import SingleBlog from './pages/SingleBlog'
import SingleProduct from './pages/SingleProduct'
import CategoryProducts from './pages/CategoryProducts'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OrderSuccessfull from './pages/OrderSuccessfull'
import OrderCancelled from './pages/OrderCancelled'
import Checkout from './pages/Checkout'
import MyAccount from './pages/MyAccount'
import Orders from './pages/Orders'

const App = () => {
  const { isAdmin, token, logout } = useContext(AppContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiryTime = localStorage.getItem("expiryTime");

      if (
        expiryTime &&
        Date.now() > Number(expiryTime)
      ) {
        logout();
        localStorage.removeItem('token')
      }
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/register' element={!token && <Signup />} />
          <Route path='/login' element={!token && <Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/blogs/:category/:id' element={<SingleBlog />} />
          <Route path='/collection/:category/:name/:id' element={<SingleProduct />} />
          <Route path='/collection/men' element={<CategoryProducts category="Men" />} />
          <Route path='/collection/women' element={<CategoryProducts category="Women" />} />
          <Route path='/collection/footwear' element={<CategoryProducts category="Footwear" />} />
          <Route path='/collection/apparel' element={<CategoryProducts category="Apparel" />} />
          <Route path='/collection/gymwear' element={<CategoryProducts category="Gymwear" />} />
          <Route path='/collection/activewear' element={<CategoryProducts category="Activewear" />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/success' element={token && <OrderSuccessfull />} />
          <Route path='/cancel' element={token && <OrderCancelled />} />
          <Route path='/checkout' element={token && <Checkout />} />
          <Route path='/my-account' element={token && <MyAccount />} />
          <Route path='/orders' element={token && <Orders />} />
        </Route>
        {
          isAdmin ? <Route path='/admin' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='addblog' element={<AddBlog />} />
            <Route path='blogs' element={<ListBlog />} />
            <Route path='products' element={<ProductList />} />
            <Route path='addproduct' element={<AddProduct />} />
            <Route path='updateblog/:blogId' element={<UpdateBlog />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='wishlist' element={<WishlistProducts />} />
            <Route path='reviews' element={<Reviews />} />
          </Route> : <Route path='/admin' element={<AdminLogin />} />
        }
      </Routes>
      <Toaster toastOptions={{
        className: "custom-toast",
      }} />
    </main>
  )
}

export default App
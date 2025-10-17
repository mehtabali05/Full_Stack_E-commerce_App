import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import BooksPage from './pages/BooksPage'
import BookDetailsPage from './pages/BookDetailsPage'
import CartPage from './pages/CartPage'
import MyOrderPage from './pages/MyOrderPage'
import AddAddressPage from './pages/AddAddressPage'
import PageNotFoundPage from './pages/PageNotFoundPage'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import ProductListPage from './pages/admin/ProductListPage'
import AddProductPage from './pages/admin/AddProductPage';
import OrdersPage from './pages/admin/OrdersPage';
import SendOtpPage from './pages/SendOtpPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

const App = () => {
    const isAdminPath = useLocation().pathname.includes("admin");
    const {isAdmin} = useContext(AppContext);
  return (
    <div className='px-6 md:px-16 lg:px-32'>
      <Toaster />
      {isAdminPath ? null : <Navbar />}
      <Routes>
        <Route path='/admin' element={isAdmin ? <AdminLayout /> : <AdminLoginPage />} >
          <Route index element={isAdmin ? <ProductListPage /> : null} />
          <Route path='add-product' element={isAdmin ? <AddProductPage /> : null} />
          <Route path='orders' element={isAdmin ? <OrdersPage /> : null} />
        </Route>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/send-email' element={<SendOtpPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='/book/:id' element={<BookDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout-success' element={<Success />} />
        <Route path='/checkout-failure' element={<Cancel />} />
        <Route path='/my-orders' element={<MyOrderPage />} />
        <Route path='/add-address' element={<AddAddressPage />} />
        <Route path='/*' element={<PageNotFoundPage />} />
      </Routes>
      {isAdminPath ? null : <Footer />}
    </div>
  )
}

export default App
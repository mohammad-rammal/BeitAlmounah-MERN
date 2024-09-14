import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'


import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import About from "./pages/about/About";

import Workshops from "./pages/workshop/Workshops";
// import ViewWorkshop from "./pages/workshopDetails/viewWorkshop";


import WorkshopDetails from "./pages/workshopDetails/WorkshopDetails";
import BookPage from "./pages/book/BookPage";
import Cart from "./pages/cart/Cart";
import Contact from "./pages/contact/Contact";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import HomePage from "./pages/home/HomePage";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import ForgotPassword from "./pages/forms/ForgetPassword";
import ResetPassowrd from "./pages/forms/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import NotFound from "./pages/not-found/NotFound"
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import Workshops from "./pages/workshop/Workshops";
import Recipes from "./components/Recipes/Recipes";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import CreatePost from "./pages/create-post/CreatePost";
import AddCategoryForm from "./pages/admin/AddCategoryForm";
import BookStoreProvider from "./context/BookStoreProvider"
import Auth from "./components/chat/Auth";
import { useState, useRef } from "react";

import Cookies from 'universal-cookie';
import ChatComponent from "./components/chat/ChatComponent";
import LanguageToggle from "./translate/LanguageToggle";
import CheckOutForm from "./pages/CheckOutForm/CheckOutForm";
import Payment from "./pages/admin/Payment";
import Intro from "./pages/intro/Intro";
const cookies = new Cookies();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);



function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}



function App() {
  const [totalPrice, setTotalPrice] = useState(0); // State to hold totalPrice

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);


  const { user } = useSelector(state => state.auth);

  return (

    <Elements stripe={stripePromise}>
      <BrowserRouter >

        <ToastContainer theme="colored" position="top-center" />

        <Header />
        <LanguageToggle />

        <Routes>
          <Route path="/welcome" element={<Intro />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/cart" element={<Cart />} />


          <Route path="/cart/payment" element={<CheckOutForm totalPrice={totalPrice} />} />



          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

          <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassowrd />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:workshopId" element={<WorkshopDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/addProduct" element={<addProduct />} />


          <Route path="/auth" element={<Auth setIsAuth={setIsAuth} isAuth={isAuth} />} />




          <Route path="/contact" element={<Contact />} />
          <Route path="/BookStoreProvider" element={<BookStoreProvider />} />

          <Route path='/recipes' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':id' element={<RecipeDetail />} />
          </Route>
          <Route path="/posts/create-post" element={user ? <CreatePost /> : <Navigate to="/" />} />
          <Route path="admin-dashboard">
            <Route index element={user?.isAdmin ? < AdminDashboard /> : <Navigate to="/" />} />
            <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
            <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
            <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
            <Route path="addCategories-table" element={user?.isAdmin ? <AddCategoryForm /> : <Navigate to="/" />} />
            <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
            <Route path="payments" element={user?.isAdmin ? <Payment /> : <Navigate to="/" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>



        {user?.isAdmin ? null : <Footer />}
      </BrowserRouter>
    </Elements>
  );

}

export default App;

import React, { useState, useContext, useEffect } from "react";
import BookStoreContext from "../../context/bookStorContext";
import Modal from "../modal/Modal";
import "./Products-slider.css";
import axios from 'axios';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


const ProductSlider = () => {
  const { addToCart } = useContext(BookStoreContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [products, setProducts] = useState([]);

  const isAuthenticated = useSelector(state => state.auth.user !== null);

  const handleRegisterClick = (item) => {
    if (isAuthenticated) {
      addToCart({...item, quantity: 1});
      
    } else {
      // Show alert to prompt user to log in
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in first to register for the workshop!",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = "/login";
        }
      });
    }
  };

  // Fetch products from the database
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        console.log('Response Data:', response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle Click
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  // Handle Modal
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setBookData(item);
  }


  return (
    <div className="book-slider-container">
      {slideIndex >= 0 && <i
        onClick={() => handleClick("left")}
        className="bi bi-chevron-left book-slider-arrow-left"
      ></i>}
      <div
        style={{ transform: `translateX(${slideIndex * -340}px)` }}
        className="book-slider-wrapper"
      >
        {products.map((item) => (
          <div key={item.id} className="book-slide-item">
            <img
              src={item.image}
              alt={item.title}
              className="book-slide-item-img"
            />
            <h3 className="book-slide-item-title">{item.title}</h3>
            <div className="item-seller">
                Seller: {item.seller}
              </div>
            <div className="book-slider-item-price">Price: ${item.price}</div>
            <div className="book-slider-icons-wrapper">
              <i onClick={() => handleOpenModal(item)} className="bi bi-eye-fill"></i>
              <i onClick={() => handleRegisterClick(item)} className="bi bi-cart-plus"></i>
            </div>
          </div>
        ))}
      </div>
      {slideIndex <= products.length - 1 && <i
        onClick={() => handleClick("right")}
        className="bi bi-chevron-right book-slider-arrow-right"
      ></i>}
      {openModal && <Modal bookData={bookData} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default ProductSlider;


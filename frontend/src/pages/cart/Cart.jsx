import { useContext, useEffect, useState } from "react";
import BookStoreContext from "../../context/bookStorContext";
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartInfo, removeFromCart, addToCart } = useContext(BookStoreContext);

  const [product, setProduct] = useState(null);


  const [totalPrice, setTotalPrice] = useState(54); // State to hold totalPrice

  // Calculate total price when cartInfo changes
  useEffect(() => {
    const total = cartInfo.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    setTotalPrice(total);
  }, [cartInfo]);

  return (
    <div className="cart">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartInfo.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={`/books/${item.image}`}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <div>
                  <div className="cart-item-book-title">
                    <b>Title: </b>
                    {item.title}
                  </div>
                  <div className="cart-item-author">
                    <b>Seller: </b>
                    {item.author}
                  </div>
                </div>
                <div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => addToCart(item, parseInt(item.quantity) + 1)}
                      className="bi bi-plus-lg"
                    ></button>
                    <b>{item.quantity}</b>
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => addToCart(item, parseInt(item.quantity) - 1)}
                      className="bi bi-dash-lg"
                    ></button>
                  </div>
                  <div className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <i
                    onClick={() => removeFromCart(item.id)}
                    className="bi bi-trash-fill"
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-order-summary">
          <h5 className="order-summary-title">ORDER SUMMARY</h5>
          <div className="order-summary-item">
            <span>Subtotal</span>
            <span>
              $
              {cartInfo.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2)}
            </span>
          </div>
          <div className="order-summary-item">
            <span>Shipping Cost</span>
            <span>0</span>
          </div>
          <div className="order-summary-item">
            <span>Discount</span>
            <span>0</span>
          </div>
          <div className="order-summary-item">
            <strong>Total</strong>
            <span>
              {totalPrice.toFixed(2)}
              {cartInfo.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2)}
            </span>
          </div>

        </div>
      </div>
      <div className="pay" style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Link to="/cart/payment">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 mr-52 mt-6 rounded">
            Proceed to Pay
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Cart;

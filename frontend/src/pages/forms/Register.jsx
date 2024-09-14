import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from 'sweetalert2';

const Register = () => {

  const dispatch = useDispatch();
  const { registerMessage } = useSelector(state => state.auth);
  console.log("Register Message:", registerMessage);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      return toast.error("Email is required");
    }

    if (username.trim() === "") {
      return toast.error("Username is required");
    }

    if (password.trim() === "") {
      return toast.error("Password is required");
    }

    dispatch(registerUser({ username, email, password }))
  };

  const navigate = useNavigate();

  if (registerMessage) {
    Swal.fire({
      title: registerMessage,
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }


  return (
    <div className="form-wrapper special">

<div className="form-img">
        <img src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1708191619/photo_2024-02-17_19-40-00_dgc95u.jpg" alt="spices" />
      </div>

      <div className="form-column">
      <h1 className="form-title">Be a part of our family</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button className="form-btn" type="submit">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already part of our family? {" "}
        <Link to="/login" className="forms-link">
          <span className="help"> Sign in here </span>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Register;

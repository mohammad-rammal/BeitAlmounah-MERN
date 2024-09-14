import { Link } from "react-router-dom";
import "./forms.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  // Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      return toast.error("Email is required");
    }

    if (password.trim() === "") {
      return toast.error("Password is required");
    }

    dispatch(loginUser({ email, password }));
  };

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  }
  return (
      
    <div className="form-wrapper special">

<div className="form-img">
        <img src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1708191619/photo_2024-02-17_19-40-00_dgc95u.jpg" alt="spices" />
      </div>
<div className="form-column">
      <h1 className="form-title">Welcome back to our family</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        {showPassword ?
          (<i onClick={showPasswordHandler} className="bi bi-eye-slash-fill show-password-icon"></i>)
          :
          (
            <i onClick={showPasswordHandler} className="bi bi-eye-fill show-password-icon"></i>
          )
        }


        <button className="form-btn" type="submit">
          Login
        </button>
      </form>
      <div className="form-footer">
        Forgot your password? {" "}
        <Link to="/forgot-password" ><span className="help">Let us help you </span></Link>

      </div>
    </div>
    </div>
  );
};

export default Login;

import "./forms.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCal";
import "./forms.css";


const ForgotPassword = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email is required");

        dispatch(forgotPassword(email));
    }

    return (
        <section className="form-wrapper special">

            <div className="form-img">
                <img src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1708191619/photo_2024-02-17_19-40-00_dgc95u.jpg" alt="spices" />
            </div>
            <div className="form-column">
                <h1 className="form-title">Get back to the family</h1>
                <form onSubmit={formSubmitHandler} className="form">

                    <div className="form-group">
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="form-btn">
                        Send reset email
                    </button>
                </form>
            </div>

        </section>
    );
};

export default ForgotPassword;
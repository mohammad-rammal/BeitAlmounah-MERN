import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCal";
import "./forms.css";


const ResetPassowrd = () => {

    const dispatch = useDispatch();
    const { isError } = useSelector(state => state.password);

    const [password, setPassword] = useState("");

    const { userId, token } = useParams();

    useEffect(() => {

        dispatch(getResetPassword(userId, token));

    }, [userId, token]);

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (password.trim() === "") return toast.error("Password is required");

        dispatch(resetPassword(password, { userId, token }));

    }

    return (
        <section className="form-wrapper special">
            {isError ? <h1>Not found</h1> :

                <>
                    <div className="form-img">
                        <img src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1708191619/photo_2024-02-17_19-40-00_dgc95u.jpg" alt="spices" />
                    </div>
                    <div className="form-column">
                        <h1 className="form-title">Reset Password</h1>
                        <form onSubmit={formSubmitHandler} className="form">

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-input2"
                                    id="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="form-btn">
                                Submit
                            </button>
                        </form>
                    </div>

                </>}

        </section>
    );
};

export default ResetPassowrd;
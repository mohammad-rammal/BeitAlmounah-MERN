import React, { useEffect } from 'react';
import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from '../../redux/apiCalls/authApiCall';

function VerifyEmail() {

    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector(state => state.auth);

    const { userId, token } = useParams();

    useEffect(() => {
        console.log("Token:", token);
        dispatch(verifyEmail(userId, token));
    }, [userId, token]);

    return (
        <section className="verify-email">
            {isEmailVerified ?
                <>
                    <i className='bi bi-patch-check verify-email-icon'></i>
                    <h1 className="verify-email-title">
                        Your email address has been successfully verified
                    </h1>
                    <Link to="/login" className='verify-email-link'>
                        Go To Login Page
                    </Link>
                </> :
                <>
                    <h1 className="verify-email-not-found">
                        Not Found
                    </h1>
                </>
            }
        </section>
    )
}

export default VerifyEmail
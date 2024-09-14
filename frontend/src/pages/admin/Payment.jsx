import React from "react";
import stripeLogo from "./paym.png"; // import your image file

const redirectToStripeDashboard = () => {
    window.location.href = "https://dashboard.stripe.com/test/payments";
}

function Payment() {
    return (
        <div className="add-category">
            <h6 className="add-category-title">Payments</h6>
            <button className="paymmt" onClick={redirectToStripeDashboard}>See All Operations</button>
            <img src={stripeLogo} alt="Stripe Logo" className="stripe-logo" />

        </div>
    );
}

export default Payment;

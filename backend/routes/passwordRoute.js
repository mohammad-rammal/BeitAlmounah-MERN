const { sendResetPasswordLinkCtrl, getResetPasswordLinkCtrl, resetPasswordCtrl } = require("../controllers/passwordController");

const router = require("express").Router();


// /api/password/rest-password-link
router.post("/reset-password-link", sendResetPasswordLinkCtrl);


// /api/password/rest-password/:userId/:token
router.route("/reset-password/:userId/:token")
    .get(getResetPasswordLinkCtrl)
    .post(resetPasswordCtrl);


module.exports = router;
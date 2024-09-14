const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/User");
const VerificationToken = require("../models/VerificationTokenPass");

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



/**___________________________________________
 * @desc     Send Reset Password Link
 * @route    /api/password/reset-password-link
 * @method   POST
 * @access   public
 * ---------------------------------------------**/
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
    //Validation
    const { error } = validateEmail(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    //Get the user from DB by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: "The account with the provided email address does not exist in our records!" });
    }

    // Check if verification token exists for the user
    let verificationToken = await VerificationToken.findOne({ userId: user._id });

    // If verification token doesn't exist, create a new one
    if (!verificationToken) {
        verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });
        await verificationToken.save();
    }

    //Creating link
    const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;

    //Creating HTML template
    const htmlTemplate = `  <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708185199/tuffsgfnzncypfbcel2i.png" alt="Order Image" style="display: block; max-width: 100%; height: auto; margin-top: 15px;"> <a href="${link}"> Click to reset password </a>`;

    //Sending Email
    await sendEmail(user.email, "Reset Password", htmlTemplate);

    //Response to the client
    res.status(200).json({ message: "A password reset link has been dispatched to your email. Please ensure to check your inbox." });
});




/**___________________________________________
 * @desc     Get Reset Password Link
 * @route    /api/password/reset-password/:userId/:token
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(400).json({ message: "invalid link" });
    }


    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!verificationToken) {
        return res.status(400).json({ message: "invalid link" });
    }

    res.status(200).json({ message: "Valid URL" });



})



/**___________________________________________
 * @desc     Reset Password Link
 * @route    /api/password/reset-password/:userId/:token
 * @method   POST
 * @access   public
 * ---------------------------------------------**/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
    //Validation
    const { error } = validateNewPassword(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    //Get the user from DB by email
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "invalid link" })
    }

    const verificationToken = await VerificationToken.findOneAndDelete({
        userId: user._id,
        token: req.params.token,
    });
    if (!verificationToken) {
        return res.status(400).json({ message: "invalid link" });
    }

    if (!user.isAccountVerified) {
        user.isAccountVerified = true;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset has been completed successfully. You may now proceed to login." });
});

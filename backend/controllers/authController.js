const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const { verificationToken } = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



/**___________________________________________
 * @desc     Register New User
 * @route    /api/auth/register
 * @method   POST
 * @access   public
 * ---------------------------------------------**/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    //validation
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); //bad request from client not server, data is wrong
    }

    //is user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {//found already
        return res.status(400).json({ message: "user already exist" });
    }

    //hash the password for new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //new user and save it to db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });


    await user.save(); //To DB


    //Create new varificationToek & save it toDB
    const verificationTokenInstance = new verificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });

    await verificationTokenInstance.save();



    //Making the link
    const link = `http://localhost:3000/users/${user._id}/verify/${verificationTokenInstance.token}`;

    //Putting the link into an html template
    const htmlTemplate = (`<img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708185850/qn8joolwyi9h4ui8dys6.png" alt="Order Image" style="display: block; max-width: 100%; height: auto; margin-top: 15px;">
        <div style={{ maxWidth: '600px', margin: '20px auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px' }}>
                <h2>Verify Your Email</h2>
            </div>
            <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '15px', fontSize: '16px', color: '#333' }}>Click on the link below to verify your email:</p>
                <a style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4caf50', color: '#ffffff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', transition: 'background-color 0.3s ease' }} href="${link}">
                    Verify Account
                </a>
            </div>
        </div>`
    );

    //Sending email to the user
    await sendEmail(user.email, "Verify You Email", htmlTemplate);

    //Response to the client


    //send a response to client
    res.status(201).json({ message: "We sent to you an email, please verify your email address" });
});



/**___________________________________________
 * @desc     Login User
 * @route    /api/auth/login
 * @method   POST
 * @access   public
 * ---------------------------------------------**/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    //Validation
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); //bad request from client not server, data is wrong
    }

    //is user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    //check the password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" });
    }


    //Sending email to verify account
    if (!user.isAccountVerified) {

        let verificationTokenInstance = await verificationToken.findOne({
            userId: user._id,
        });

        if (!verificationToken) {
            verificationTokenInstance = new verificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });

            await verificationTokenInstance.save();
        }

        //Making the link
        const link = `http://localhost:3000/users/${user._id}/verify/${verificationTokenInstance.token}`;

        //Putting the link into an html template
        const htmlTemplate = (`
        <div style={{ maxWidth: '600px', margin: '20px auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px' }}>
                <h2>Verify Your Email</h2>
            </div>
            <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '15px', fontSize: '16px', color: '#333' }}>Click on the link below to verify your email:</p>
                <a style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4caf50', color: '#ffffff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', transition: 'background-color 0.3s ease' }} href="${link}">
                    Verify Account
                </a>
            </div>
        </div>`
        );

        //Sending email to the user
        await sendEmail(user.email, "Verify You Email", htmlTemplate);

        return res
            .status(400)
            .json({ message: "We sent to you an email, please verify your email address" });
    }


    //generate token (jwt)
    const token = user.generateAuthToken();

    //reponse to client
    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        role: user.role,
        token,
        username: user.username,

    });

    //
});



/**___________________________________________
 * @desc     Verify User Account
 * @route    /api/auth/:userId/verify/:token
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(400).json({ message: "Invalid link - user not found" });
    }

    const verificationTokenInstance = await verificationToken.findOneAndDelete({
        userId: user._id,
        token: req.params.token,
    });

    // if (!verificationTokenInstance && !user.isAccountVerified) {
    //     return res.status(400).json({ message: "Invalid link - token not found" });
    // }

    // Mark user as verified
    user.isAccountVerified = true;
    await user.save();

    res.status(200).json({ message: "Your account has been successfully verified" });
});
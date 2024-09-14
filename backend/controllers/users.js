const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegisterUser } = require("../models/User");

const { User, validateUpdateUser } = require("../models/User");

/**
 * @desc      Get user profile
 * @route     GET /api/users/profile
 * @method    GET
 * @access    Private
 */
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
};

/**
 * @desc      Update user profile
 * @route     PUT /api/users/profile
 * @method    PUT
 * @access    Private
 */
const updateProfile = async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: req.body },
        { new: true }
    ).select("-password -__v");

    res.status(200).json(updatedUser);
};

/**
 * @desc      Get all users (admin only)
 * @route     GET /api/users
 * @method    GET
 * @access    Private (admin only)
 */
const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
};

/**
 * @desc      Get user by ID (admin only)
 * @route     GET /api/users/:id
 * @method    GET
 * @access    Private (admin only)
 */
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

/**
 * @desc      Delete user by ID (admin only)
 * @route     DELETE /api/users/:id
 * @method    DELETE
 * @access    Private (admin only)
 */
const deleteUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

/**
 * @desc      Update user role by ID (admin only)
 * @route     PATCH /api/users/update-role/:id
 * @method    PATCH
 * @access    Private (admin only)
 */
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { newRole } = req.body;

        console.log("Request Body:", req.body);

        const updatedUser = await User.findByIdAndUpdate(id, { role: newRole }, { new: true }).select("-password");

        console.log("Updated User:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User role updated successfully.', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc      Create a new user (admin only)
 * @route     POST /api/users
 * @method    POST
 * @access    Private (admin only)
 */
const createUser = async (req, res) => {
    try {
        const { error } = validateRegisterUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "This user is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            image: req.body.image,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
        });

        const result = await user.save();

        const token = user.generateToken();

        const { password, ...other } = result._doc;

        res.status(201).json({ ...other, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserCountCtrl = async (req, res) => {
    const user = await User.countDocuments();

    res.status(200).json(post);
};



module.exports = {
    updateUserRole,
    getUserProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    deleteUserById,
    createUser,
    getUserCountCtrl,
};

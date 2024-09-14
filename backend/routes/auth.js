const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import User model and validation functions
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const { verifyUserAccountCtrl, registerUserCtrl, loginUserCtrl } = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *         firstName:
 *           type: string
 *         image:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - email
 *         - username
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         image:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - email
 *         - username
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or user already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Registration details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/RegisterUser'
 */
router.post("/register",registerUserCtrl, asyncHandler(async (req, res) => {
  // Implementation of register endpoint
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
}));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Login details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LoginUser'
 */
router.post("/login", loginUserCtrl,asyncHandler(async (req, res) => {
  // Implementation of login endpoint
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "This user not registered or invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "This user not registered or invalid email or password" });
  }

  const token = user.generateToken();

  const { password, ...other } = user._doc;

  res.status(200).json({ ...other, token });
}));

// /api/auth/:userId/verify/:token
router.post("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router;

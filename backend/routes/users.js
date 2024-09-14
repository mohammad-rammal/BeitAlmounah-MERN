const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require("../middlewares/verifiyToken");
const usersController = require("../controllers/users");

router.patch("/update-role/:id", verifyTokenAndAdmin, asyncHandler(usersController.updateUserRole));
router.post("/", verifyTokenAndAdmin, asyncHandler(usersController.createUser));
router.get("/profile", verifyTokenAndAuthorization, asyncHandler(usersController.getUserProfile));
router.put("/profile/:id", verifyTokenAndAuthorization, asyncHandler(usersController.updateProfile));
router.get("/", verifyToken, asyncHandler(usersController.getAllUsers));
// router.get("/counts", verifyToken, asyncHandler(usersController.getUserCountCtrl));
router.get("/:id", verifyTokenAndAdmin, asyncHandler(usersController.getUserById));
router.delete("/:id", verifyTokenAndAdmin, asyncHandler(usersController.deleteUserById));


// /api/posts/count
router.get("/count", asyncHandler(usersController.getUserCountCtrl));
module.exports = router;

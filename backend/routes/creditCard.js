const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifiyToken");
const creditCardController = require("../controllers/creditCard");

router.get("/", asyncHandler(creditCardController.getAllCreditCards));
router.get("/:id", asyncHandler(creditCardController.getCreditCardById));
router.post("/", asyncHandler(creditCardController.createCreditCard));
router.put("/:id", asyncHandler(creditCardController.updateCreditCard));
router.delete("/:id", asyncHandler(creditCardController.deleteCreditCard));

module.exports = router;

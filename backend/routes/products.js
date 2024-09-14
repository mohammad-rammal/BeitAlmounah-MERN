const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifiyToken");
const productsController = require("../controllers/products");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", verifyTokenAndAdmin, productsController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productsController.updateProductById);
router.delete("/:id", verifyTokenAndAdmin, productsController.deleteProductById);

module.exports = router;

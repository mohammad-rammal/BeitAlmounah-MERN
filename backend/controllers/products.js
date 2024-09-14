const asyncHandler = require("express-async-handler");
const { Products, productsValidationSchema } = require("../models/Products");

/**
 * @desc      Get all products
 * @route     GET /api/products
 * @method    GET
 * @access    Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.find();
    res.status(200).json(products);
});

/**
 * @desc      Get product by ID
 * @route     GET /api/products/:id
 * @method    GET
 * @access    Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

/**
 * @desc      Create a new product
 * @route     POST /api/products
 * @method    POST
 * @access    Private (admin only)
 */
const createProduct = asyncHandler(async (req, res) => {
    const { error } = productsValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const newProduct = await Products.create(req.body);
    res.status(201).json(newProduct);
});

/**
 * @desc      Update product by ID
 * @route     PUT /api/products/:id
 * @method    PUT
 * @access    Private (admin only)
 */
const updateProductById = asyncHandler(async (req, res) => {
    const { error } = productsValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

/**
 * @desc      Delete product by ID
 * @route     DELETE /api/products/:id
 * @method    DELETE
 * @access    Private (admin only)
 */
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product has been deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};

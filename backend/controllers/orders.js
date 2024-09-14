const express = require("express");
const asyncHandler = require("express-async-handler");
const { Orders, ordersValidationSchema, ordersUpdateSchema } = require("../models/Orders");

// Your middleware imports if needed

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Orders.find();
    res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.id);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: "Order is not found" });
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { error } = ordersValidationSchema(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const order = new Orders({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        address: req.body.address,
        creditId: req.body.creditId,
    });
    const result = await order.save();
    res.status(201).json(order);
});

const updateOrderById = asyncHandler(async (req, res) => {
    const { error } = ordersUpdateSchema(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                address: req.body.address,
                creditId: req.body.creditId,
            },
        },
        { new: true }
    );

    if (updatedOrder) {
        res.status(200).json(updatedOrder);
    } else {
        res.status(404).json({ message: "Order is not found" });
    }
});

const deleteOrderById = asyncHandler(async (req, res) => {
    const deletedOrder = await Orders.findByIdAndDelete(req.params.id);

    if (deletedOrder) {
        res.status(200).json({ message: "Order deleted successfully" });
    } else {
        res.status(404).json({ message: "Order is not found" });
    }
});

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
};

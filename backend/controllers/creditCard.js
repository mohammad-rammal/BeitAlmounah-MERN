const bcrypt = require("bcryptjs");
const { CreditCard, creditCardValidation, validateUpdateCreditCard } = require("../models/CreditCard");

const getAllCreditCards = async (req, res) => {
    const creditCards = await CreditCard.find();
    res.status(200).json(creditCards);
};

const getCreditCardById = async (req, res) => {
    const creditCard = await CreditCard.findById(req.params.id);
    if (creditCard) {
        res.status(200).json(creditCard);
    } else {
        res.status(404).json({ message: "Credit card not found" });
    }
};

const createCreditCard = async (req, res) => {
    const { error } = creditCardValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.hashedCvv = await bcrypt.hash(req.body.hashedCvv, salt);

    const creditCard = new CreditCard({
        cardNumber: req.body.cardNumber,
        cardHolder: req.body.cardHolder,
        expirationMonth: req.body.expirationMonth,
        expirationYear: req.body.expirationYear,
        hashedCvv: req.body.hashedCvv,
    });

    const result = await creditCard.save();

    const { hashedCvv, ...other } = result._doc;
    res.status(201).json({ ...other });
};

const updateCreditCard = async (req, res) => {
    const { error } = validateUpdateCreditCard(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.hashedCvv) {
        const salt = await bcrypt.genSalt(10);
        req.body.hashedCvv = await bcrypt.hash(req.body.hashedCvv, salt);
    }

    const updatedCreditCard = await CreditCard.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                cardNumber: req.body.cardNumber,
                cardHolder: req.body.cardHolder,
                expirationMonth: req.body.expirationMonth,
                expirationYear: req.body.expirationYear,
                hashedCvv: req.body.hashedCvv,
            }
        },
        { new: true }
    ).select("-hashedCvv");

    if (!updatedCreditCard) {
        return res.status(404).json({ message: "Credit card not found" });
    }

    res.status(200).json(updatedCreditCard);
};

const deleteCreditCard = async (req, res) => {
    const deletedCreditCard = await CreditCard.findByIdAndDelete(req.params.id);

    if (deletedCreditCard) {
        res.status(200).json({ message: "Credit card was deleted successfully" });
    } else {
        res.status(404).json({ message: "Credit card not found" });
    }
};

module.exports = {
    getAllCreditCards,
    getCreditCardById,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard,
};

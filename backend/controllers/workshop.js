const { Workshop, workshopValidationSchema } = require('../models/Workshop');
const Joi = require('joi');

const getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find();
        res.json(workshops);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkshopById = async (req, res) => {
    const { id } = req.params;

    try {
        const workshop = await Workshop.findById(id);

        if (!workshop) {
            return res.status(404).json({ error: 'Workshop not found' });
        }

        res.json(workshop);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createWorkshop = async (req, res) => {
    const { error, value } = workshopValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const newWorkshop = new Workshop(value);
        const savedWorkshop = await newWorkshop.save();
        res.status(201).json(savedWorkshop);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateWorkshop = async (req, res) => {
    const { id } = req.params;
    const { error, value } = workshopValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updatedWorkshop = await Workshop.findByIdAndUpdate(id, value, { new: true });

        if (!updatedWorkshop) {
            return res.status(404).json({ error: 'Workshop not found' });
        }

        res.json(updatedWorkshop);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteWorkshop = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkshop = await Workshop.findByIdAndDelete(id);

        if (!deletedWorkshop) {
            return res.status(404).json({ error: 'Workshop not found' });
        }

        res.json({ message: 'Workshop deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getWorkshopCountCtrl = async (req, res) => {
    try {
        const workshops = await Workshop.countDocuments();
        res.json(workshops);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getAllWorkshops,
    getWorkshopById,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    getWorkshopCountCtrl
};

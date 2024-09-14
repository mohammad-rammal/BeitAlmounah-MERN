const { Video, videoValidationSchema } = require('./video');
const Joi = require('joi');

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getVideoById = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);
        
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(video);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createVideo = async (req, res) => {
    const { error, value } = videoValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const newVideo = new Video(value);
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateVideo = async (req, res) => {
    const { id } = req.params;
    const { error, value } = videoValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updatedVideo = await Video.findByIdAndUpdate(id, value, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(updatedVideo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
};

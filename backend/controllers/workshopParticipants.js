const { WorkshopParticipants, workshopParticipantsValidationSchema } = require("../models/WorkshopParticipants");
const asyncHandler = require("express-async-handler");

// Register and pay for a workshop
const registerAndPay = asyncHandler(async (req, res) => {
    const { user_id, workshop_id, payment_status, videoCheckbox } = req.body;

    // Validate request data
    const { error } = workshopParticipantsValidationSchema.validate({
        user_id,
        workshop_id,
        payment_status,
        videoCheckbox,
    }, { abortEarly: false });

    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    }

    try {
        // Check if the user is already registered for the workshop
        const existingParticipant = await WorkshopParticipants.findOne({ user_id, workshop_id });

        if (existingParticipant) {
            return res.status(400).json({ message: "User is already registered for this workshop." });
        }

        // Save registration details in the database
        const newParticipant = await WorkshopParticipants.create({
            user_id,
            workshop_id,
            payment_status,
            video: {
                title: "Your Video Title", // Set the actual video title
                watchedCheckbox: videoCheckbox,
            },
        });

        res.status(200).json({ message: "Registration and payment successful.", participant: newParticipant });
    } catch (error) {
        console.error("Error registering and paying for a workshop:", error);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
});



// Get workshop video after payment confirmation
const getWorkshopVideo = asyncHandler(async (req, res) => {
    const workshopId = req.params.workshopId;
    const userId = req.user.id;

    try {
        // Check if the user has paid for the workshop and get the workshop with video
        const workshopWithVideo = await WorkshopParticipants.findOne({
            user_id: userId,
            workshop_id: workshopId,
            payment_status: 'paid'
        })
            .populate({
                path: 'workshop_id',
                select: 'video',
            });

        if (!workshopWithVideo || !workshopWithVideo.workshop_id || !workshopWithVideo.workshop_id.video) {
            return res.status(404).json({ message: "Permission denied or workshop video not found." });
        }

        // Return the video information or any other data you want
        res.status(200).json({ video: workshopWithVideo.workshop_id.video });
    } catch (error) {
        console.error("Error getting workshop video:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Get all participants for a workshop
const getParticipantsByWorkshopId = asyncHandler(async (req, res) => {
    const workshopId = req.params.workshopId;

    try {

        const participants = await WorkshopParticipants.find({ workshop_id: workshopId });

        res.status(200).json({ participants: participants });
    } catch (error) {
        console.error("Error getting participants for the workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Get all participants for a workshop
const getAllParticipants = asyncHandler(async (req, res) => {
    try {
        const participants = await WorkshopParticipants.find().populate('user_id');
        res.status(200).json({ participants });
    } catch (error) {
        console.error('Error fetching workshop participants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Get completed workshops and badges for a participant
const getCompletedWorkshops = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const completedWorkshops = await WorkshopParticipants.find({ user_id: userId, payment_status: 'paid' })
            .populate('workshop_id');

        res.status(200).json({ completedWorkshops: completedWorkshops });
    } catch (error) {
        console.error("Error getting completed workshops and badges:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Add a user to a workshop (admin)
const addUserToWorkshop = asyncHandler(async (req, res) => {
    const workshopId = req.params.workshopId;
    const userIdToAdd = req.params.userId;

    try {
        const workshopExists = await Workshop.findOne({ _id: workshopId });

        if (!workshopExists) {
            return res.status(404).json({ message: "Workshop not found." });
        }


        const newParticipant = await WorkshopParticipants.create({
            user_id: userIdToAdd,
            workshop_id: workshopId,
            payment_status: 'pending',
        });

        res.status(200).json({ message: "User added to the workshop successfully.", participant: newParticipant });
    } catch (error) {
        console.error("Error adding user to workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Remove a participant from a workshop (admin)
const removeParticipantFromWorkshop = asyncHandler(async (req, res) => {
    const participantIdToRemove = req.params.participantId;
    try {
        const removedParticipant = await WorkshopParticipants.findByIdAndRemove(participantIdToRemove);

        if (!removedParticipant) {
            return res.status(404).json({ message: "Participant not found." });
        }

        res.status(200).json({ message: "Participant removed from the workshop successfully." });
    } catch (error) {
        console.error("Error removing participant from workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = {
    registerAndPay,
    getWorkshopVideo,
    getParticipantsByWorkshopId,
    getCompletedWorkshops,
    addUserToWorkshop,
    removeParticipantFromWorkshop,
    getAllParticipants,
};
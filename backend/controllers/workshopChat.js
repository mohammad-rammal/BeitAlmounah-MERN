const { WorkshopChat, workshopChatValidationSchema } = require("../models/WorkshopChat");
const asyncHandler = require("express-async-handler");

// Create a new message in the workshop chat
const createMessage = asyncHandler(async (req, res) => {
    
    const { error } = workshopChatValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    }
    
    const newMessage = await WorkshopChat.create(req.body);
    res.status(201).json(newMessage);
});

// Get all messages in the workshop chat for a specific workshop
const getMessagesByWorkshopId = asyncHandler(async (req, res) => {
    
    const messages = await WorkshopChat.find({ workshop_id: req.params.workshopId });
    res.status(200).json(messages);
});

// Delete a message in the workshop chat (admin action)
const deleteMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Permission denied. Only admins can perform this action." });
    }
    const updatedMessage = await WorkshopChat.findByIdAndUpdate(
        messageId,
        { deleted: true },
        { new: true }
    );
    if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found." });
    }
    res.status(200).json(updatedMessage);
});



// Delete user's own message in the workshop chat
const deleteOwnMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;

    try {
        // Find the message
        const message = await WorkshopChat.findById(messageId);

        // Check if the message exists
        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        // Check if the user owns the message
        if (!message.user_id.equals(req.user.id)) {
            return res.status(403).json({ message: "Permission denied. You can only delete your own messages." });
        }

        // Mark the message as deleted
        const updatedMessage = await WorkshopChat.findByIdAndUpdate(
            messageId,
            { deleted: true },
            { new: true }
        );

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Error deleting user's own message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Edit user's own message in the workshop chat
const editOwnMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const { message } = req.body;

    try {
        // Find the message
        const existingMessage = await WorkshopChat.findById(messageId);

        // Check if the message exists
        if (!existingMessage) {
            return res.status(404).json({ message: "Message not found." });
        }

        // Check if the user is the author of the message
        if (!existingMessage.user_id.equals(req.user.id)) {
            return res.status(403).json({ message: "Permission denied. You can only edit your own messages." });
        }

        // Update the message
        existingMessage.message = message;

        // Save the updated message
        const updatedMessage = await existingMessage.save();

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Error editing user's own message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Add a user to the workshop chat (admin action)
const addUserToChat = asyncHandler(async (req, res) => {
    const { workshop_id, user_id } = req.body;
    
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Permission denied. Only admins can add users to the chat." });
    }

    try {
        
        const updatedChat = await WorkshopChat.findOneAndUpdate(
            { workshop_id },
            { $addToSet: { user_id } }, 
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ message: "Workshop chat not found." });
        }
        res.status(200).json({ message: "User added to the workshop chat." });
    } catch (error) {
        console.error("Error adding user to workshop chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Kick a user from the workshop chat (admin action)
const kickUserFromChat = asyncHandler(async (req, res) => {
    const { workshop_id, user_id } = req.body;
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Permission denied. Only admins can kick users from the chat." });
    }
    try {
        
        const updatedChat = await WorkshopChat.findOneAndUpdate(
            { workshop_id },
            { $pull: { user_id } }, 
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ message: "Workshop chat not found." });
        }
        res.status(200).json({ message: "User kicked from the workshop chat." });
    } catch (error) {
        console.error("Error kicking user from workshop chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// React to a message with an emoji
const reactToMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const { emoji } = req.body;

    try {
        // Find the message
        const message = await WorkshopChat.findById(messageId);

        // Check if the message exists
        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }
        // Check if the user has already reacted to this message
        const existingReaction = message.reactions.find(
            reaction => reaction.user_id.equals(req.user.id)
        );

        if (existingReaction) {
            // Update the existing reaction
            existingReaction.emoji = emoji;
        } else {
            // Add a new reaction
            message.reactions.push({
                user_id: req.user.id,
                emoji: emoji
            });
        }

        // Save the updated message
        const updatedMessage = await message.save();

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Error reacting to message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = {
    createMessage,
    getMessagesByWorkshopId,
    deleteMessage,
    deleteOwnMessage,
    editOwnMessage,
    addUserToChat,
    kickUserFromChat,
    reactToMessage
};
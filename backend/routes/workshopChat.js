const express = require("express");
const router = express.Router();
const workshopChatController = require("../controllers/workshopChat");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifiyToken");

/**
 * @desc      Create a new message in the workshop chat
 * @route     POST /api/workshop-chat
 * @method    POST
 * @access    Private
 */
router.post("/", verifyToken, workshopChatController.createMessage);

/**
 * @desc      Get all messages in the workshop chat for a specific workshop
 * @route     GET /api/workshop-chat/:workshopId
 * @method    GET
 * @access    Private
 */
router.get("/:workshopId", verifyToken, workshopChatController.getMessagesByWorkshopId);

/**
 * @desc      Delete a message in the workshop chat (admin action)
 * @route     DELETE /api/workshop-chat/:messageId
 * @method    DELETE
 * @access    Private (admin)
 */
router.delete("/:messageId", verifyTokenAndAdmin, workshopChatController.deleteMessage);


/**
 * @desc      Edit user's own message in the workshop chat
 * @route     PUT /api/workshop-chat/edit-own-message/:messageId
 * @method    PUT
 * @access    Private
 */
router.put("/edit-own-message/:messageId", verifyToken, workshopChatController.editOwnMessage);

/**
 * @desc      Delete user's own message in the workshop chat
 * @route     DELETE /api/workshop-chat/delete-own-message/:messageId
 * @method    DELETE
 * @access    Private
 */
router.delete("/delete-own-message/:messageId", verifyToken, workshopChatController.deleteOwnMessage);

/**
 * @desc      Add a user to the workshop chat (admin action)
 * @route     POST /api/workshop-chat/add-user
 * @method    POST
 * @access    Private (admin)
 */
router.post("/add-user", verifyTokenAndAdmin, workshopChatController.addUserToChat);

/**
 * @desc      Kick a user from the workshop chat (admin action)
 * @route     DELETE /api/workshop-chat/kick-user/:userId
 * @method    DELETE
 * @access    Private (admin)
 */
router.delete("/kick-user/:userId", verifyTokenAndAdmin, workshopChatController.kickUserFromChat);


/**
 * @desc      React to a message with an emoji
 * @route     POST /api/workshop-chat/react/:messageId
 * @method    POST
 * @access    Private
 */
router.post("/react/:messageId", verifyToken, workshopChatController.reactToMessage);

module.exports = router;
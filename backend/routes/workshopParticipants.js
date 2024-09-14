const express = require("express");
const router = express.Router();
const workshopParticipantsController = require("../controllers/workshopParticipants");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifiyToken");

/**
 * @desc      Register and pay for a workshop
 * @route     POST /api/workshop-participants/register-and-pay
 * @method    POST
 * @access    Private
 */
router.post("/register-and-pay", verifyToken, workshopParticipantsController.registerAndPay);

/**
 * @desc      Get workshop video after payment confirmation
 * @route     GET /api/workshop-participants/video/:workshopId
 * @method    GET
 * @access    Private
 */
router.get("/video/:workshopId", verifyToken, workshopParticipantsController.getWorkshopVideo);


/**
 * @desc      Get all participants for a workshop
 * @route     GET /api/workshop-participants/:workshopId/participants
 * @method    GET
 * @access    Private
 */
router.get("/:workshopId/participants", workshopParticipantsController.getParticipantsByWorkshopId);


router.get("/", workshopParticipantsController.getAllParticipants);

/**
 * @desc      Get completed workshops and badges for a participant
 * @route     GET /api/workshop-participants/completed-workshops
 * @method    GET
 * @access    Private
 */
router.get("/completed-workshops", verifyToken, workshopParticipantsController.getCompletedWorkshops);

/**
 * @desc      Add a user to a workshop (admin)
 * @route     POST /api/workshop-participants/add-user/:workshopId/:userId
 * @method    POST
 * @access    Private (admin)
 */
router.post("/add-user/:workshopId/:userId", verifyTokenAndAdmin, workshopParticipantsController.addUserToWorkshop);

/**
 * @desc      Remove a participant from a workshop (admin)
 * @route     DELETE /api/workshop-participants/remove-participant/:participantId
 * @method    DELETE
 * @access    Private (admin)
 */
router.delete("/remove-participant/:participantId", verifyTokenAndAdmin, workshopParticipantsController.removeParticipantFromWorkshop);

module.exports = router;
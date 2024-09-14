const express = require("express");
const router = express.Router();
const workshopController = require('../controllers/workshop');

/**
 * @desc      Get all workshops
 * @route     GET /api/workshops
 * @method    GET
 * @access    Public
 */
router.get('/', workshopController.getAllWorkshops);

/**
 * @desc      Get workshop by ID
 * @route     GET /api/workshops/:id
 * @method    GET
 * @access    Public
 */
router.get('/workshops/:id', workshopController.getWorkshopById);

/**
 * @desc      Create a new workshop
 * @route     POST /api/workshops
 * @method    POST
 * @access    Private (admin only)
 */
router.post('/workshops', workshopController.createWorkshop);

/**
 * @desc      Update workshop by ID
 * @route     PUT /api/workshops/:id
 * @method    PUT
 * @access    Private (admin only)
 */
router.put('/workshops/:id', workshopController.updateWorkshop);

/**
 * @desc      Delete workshop by ID
 * @route     DELETE /api/workshops/:id
 * @method    DELETE
 * @access    Private (admin only)
 */
router.delete('/workshops/:id', workshopController.deleteWorkshop);



// /api/posts/count
router.get("/count", workshopController.getWorkshopCountCtrl);


module.exports = router;


const express = require('express');
const videoController = require('../controllers/video');

const router = express.Router();

/**
 * @desc      Get all video
 * @route     GET /api/videos
 * @method    GET
 * @access    Public
 */
router.get('/videos', videoController.getAllVideos);
/**
 * @desc      Get video by id
 * @route     GET /api/videos/:id
 * @method    GET
 * @access    Public
 */
router.get('/videos/:id', videoController.getVideoById);

router.post('/videos', videoController.createVideo);

router.put('/videos/:id', videoController.updateVideo);

router.delete('/videos/:id', videoController.deleteVideo);

module.exports = router;

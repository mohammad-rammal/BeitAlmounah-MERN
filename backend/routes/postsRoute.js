const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, approvePostCtrl } = require("../controllers/postController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifiyToken");
const validateObjectId = require("../middlewares/validateObjectId");


// /api/posts
router.route("/")
    .post(verifyToken, photoUpload.single("image"), createPostCtrl)
    .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router.route("/:id")
    .get(validateObjectId, getSinglePostCtrl)
    .delete(validateObjectId, verifyToken, deletePostCtrl)
    .put(validateObjectId, verifyToken, updatePostCtrl);


    router.put('/approve/:id', approvePostCtrl);

// /api/posts/update-image/:id
router.route("/update-image/:id")
    .put(validateObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl);



module.exports = router;
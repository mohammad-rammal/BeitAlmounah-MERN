const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost, validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");



/**___________________________________________
 * @desc     Create New Post
 * @route    /api/posts
 * @method   POST
 * @access   private (only logged in user)
 * ---------------------------------------------**/
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
    // Validation for image
    if (!req.file) {
        return res.status(400).json({ message: "no image provided" });
    }

    // Validation for data
    const { error } = validateCreatePost(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Attach user information to the request object
    const userId = req.user._id;

    // Upload photo
    const imagePath = req.file.path; // Use the correct path from multer
    const result = await cloudinaryUploadImage(imagePath);

    // Create new post and save it to DB
    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        user: userId, // Set the user field to the user's ID
        image: {
            url: result.secure_url,
            publicId: result.public_id,
        }
    });

    // Send response to the client
    res.status(201).json(post);

    // Remove image from the server
    fs.unlinkSync(imagePath);
});





/**___________________________________________
 * @desc     Get All Posts
 * @route    /api/posts
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
    const POST_PER_PAGE = 5;
    const { pageNumber, category } = req.query;
    let posts;

    if (pageNumber) { // pagination
        const skipCount = (pageNumber - 1) * POST_PER_PAGE;
        posts = await Post.find()
            .skip(skipCount)
            .limit(POST_PER_PAGE)
            .sort({ createdAt: -1 })
            .populate("user", ["-password"]);

        const totalPostsCount = await Post.countDocuments();
        const totalPages = Math.ceil(totalPostsCount / POST_PER_PAGE);
        res.status(200).json({ posts, totalPages });
    } else if (category) { //search by category
        posts = await Post
            .find({ category: category })
            .sort({ createdAt: -1 })
            .populate("user", ["-password"]);

    } else {//show all
        posts = await Post.find().sort({ createdAt: -1 })
            .populate("user", ["-password"]);   //take all details in object user
    }
    res.status(200).json(posts);
});




/**___________________________________________
 * @desc     Get Single Post
 * @route    /api/posts/:id
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate("user", ["-password"])
    if (!post) {
        return res.status(400).json({ message: 'post not found' });
    }

    res.status(200).json(post);
});




/**___________________________________________
 * @desc     Get Posts Count
 * @route    /api/posts/count
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
    const post = await Post.countDocuments();

    res.status(200).json(post);
});




/**___________________________________________
 * @desc     Get Delete Post
 * @route    /api/posts/:id
 * @method   DELETE
 * @access   private (only admin or owner of the post)
 * ---------------------------------------------**/
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ message: 'post not found' });
    }

    if (req.user.isAdmin || req.user.id === post.user.toString()) {
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);

        res.status(200).json({ message: "post has been deleted successfully", postId: post._id });
    } else {
        res.status(403).json({ message: "access denied, forbidden" });
    }


});




/**___________________________________________
 * @desc     Update Post
 * @route    /api/posts/:id
 * @method   PUT
 * @access   private (only owner of the post)
 * ---------------------------------------------**/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
    //validation
    const { error } = validateUpdatePost(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }


    //Get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'post not found' });
    }


    //Check if this post belong to logged in user
    if (req.user.id !== post.user.toString()) {
        return res.status(403).json({ message: 'access denied, you are not allowed' });
    }


    //Update post
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        }
    }, { new: true }).populate("user", ["-password"])



    //Send response to client
    res.status(200).json(updatedPost);

});




/**___________________________________________
 * @desc     Update Post Image
 * @route    /api/posts/update-image/:id
 * @method   PUT
 * @access   private (only owner of the post)
 * ---------------------------------------------**/
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
    //validation
    if (!req.file) {
        return res.status(400).json({ message: "no image provided" });
    }


    //Get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'post not found' });
    }


    //Check if this post belong to logged in user
    if (req.user.id !== post.user.toString()) {
        return res.status(403).json({ message: 'access denied, you are not allowed' });
    }


    //Delete the old image
    await cloudinaryRemoveImage(post.image.publicId)


    //Upload new photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);


    //Update image field in the db
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            image: result.secure_url,
            publicId: result.public_id,
        }
    }, { new: true });


    //Send response to client
    res.status(200).json(updatedPost);


    //Remove image from the server
    fs.unlinkSync(imagePath);

});


/**___________________________________________
 * @desc     Toggle Like
 * @route    /api/posts/like/:id
 * @method   PUT
 * @access   private (only logged in user)
 * ---------------------------------------------**/
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
    const loggedInUser = req.user.id;
    const { id: postId } = req.params;

    let post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "post not found" });
    }

    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === loggedInUser);

    if (isPostAlreadyLiked) {
        post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: loggedInUser } //remove value from array
            },
            { new: true });
    } else {
        post = await Post.findByIdAndUpdate(

            postId,
            {
                $push: { likes: loggedInUser } //add value from array
            },
            { new: true });
    }
    res.status(200).json(post);
});



/**___________________________________________
 * @desc     Approve
 * @route    /api/posts/approve/:id
 * @method   POST
 * @access   private (only admin)
 * ---------------------------------------------**/
module.exports.approvePostCtrl = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    // Find the post by ID and update the approve field to true
    const post = await Post.findByIdAndUpdate(postId, { approve: true }, { new: true });

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post approved successfully', post });
});


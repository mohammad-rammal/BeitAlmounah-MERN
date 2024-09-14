const asyncHandler = require("express-async-handler");
const { ValidateCreateCategory, Category } = require("../models/Category");



/**___________________________________________
 * @desc     Create New Category
 * @route    /api/Categories
 * @method   POST
 * @access   private (only admin)
 * ---------------------------------------------**/
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
    const { error } = ValidateCreateCategory(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const category = await Category.create({
        title: req.body.title,
        user: req.user.id
    });

    res.status(201).json(category);

})



/**___________________________________________
 * @desc     Get All Categories
 * @route    /api/Categories
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json(categories);

})



/**___________________________________________
 * @desc     Delete Category
 * @route    /api/Categories/:id
 * @method   DELETE
 * @access   private (only admin)
 * ---------------------------------------------**/
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(400).json({ message: "category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'category has been deleted successfully',
        categoryId: category._id,
    });

})

/**___________________________________________
 * @desc     Get Categories Count
 * @route    /api/categories/count
 * @method   GET
 * @access   public
 * ---------------------------------------------**/
module.exports.getCategoriesCountCtrl = asyncHandler(async (req, res) => {
    const count = await Category.countDocuments();
    res.status(200).json(count);
});

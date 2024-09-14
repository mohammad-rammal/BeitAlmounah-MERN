const router = require("express").Router();
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl, getCategoriesCountCtrl } = require("../controllers/categoriesController");
const validateObjectId = require("../middlewares/validateObjectId");

const { verifyTokenAndAdmin } = require("../middlewares/verifiyToken");

// /api/categories
router.route("/")
    .post(verifyTokenAndAdmin, createCategoryCtrl)
    .get(getAllCategoriesCtrl);



// /api/categories/:id
router.route("/:id")
    .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

    // /api/categories/count
router.route("/count")
.get(getCategoriesCountCtrl);

module.exports = router;
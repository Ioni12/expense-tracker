const router = require("express").Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;

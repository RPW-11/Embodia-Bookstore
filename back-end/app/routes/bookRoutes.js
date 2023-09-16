const { Router } = require("express");
const bookController = require("../controllers/Book/bookController");

const router = Router();

router.post("", bookController.add);
router.get("", bookController.get);
router.get("/search", bookController.search);
router.get("/autocomplete", bookController.autoComplete);
router.get("/:id", bookController.getOne);
router.delete("/:id", bookController.delete);
router.put("/:id", bookController.update);

module.exports = router;    
const { Router } = require("express");
const cartController = require("../controllers/User/cartController");

const router = Router();

// cart
router.get("/cart", cartController.getUserCart);
router.post("/cart", cartController.addItem);
router.delete("/cart", cartController.deleteItem);
router.put("/cart", cartController.updateItem);

module.exports = router;
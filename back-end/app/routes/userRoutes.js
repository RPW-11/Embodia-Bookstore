const { Router } = require("express");
const cartController = require("../controllers/User/cartController");
const addressController = require("../controllers/User/addressController");

const router = Router();

// cart
router.get("/cart", cartController.getUserCart);
router.post("/cart", cartController.addItem);
router.delete("/cart", cartController.deleteItem);
router.put("/cart", cartController.updateItem);

// address
router.get("/address", addressController.get);
router.delete("/address", addressController.delete);
router.post("/address", addressController.post);
router.put("/address/:id", addressController.update);

module.exports = router;
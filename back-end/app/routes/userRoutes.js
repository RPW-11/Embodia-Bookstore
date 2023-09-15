const { Router } = require("express");
const cartController = require("../controllers/User/cartController");
const addressController = require("../controllers/User/addressController");
const orderController = require("../controllers/User/orderController");

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

// order
router.get("/order/:userId", orderController.get);
router.post("/order", orderController.post);
router.put("/order", orderController.put);


module.exports = router;
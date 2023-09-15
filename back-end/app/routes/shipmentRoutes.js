const { Router } = require("express");
const shipmentController = require("../controllers/shipmentController");

const router = Router();

router.get("/shipment", shipmentController.get);

module.exports = router;
const express = require("express");
const router = express.Router();

const produceController = require("../controllers/produce.controller");

console.log("✅ Produce routes loaded");

router.post("/", produceController.createProduce);

router.get("/", produceController.getAllProduce);

router.get("/:id", produceController.getProduce);

router.put("/:id", produceController.updateProduce);

router.delete("/:id", produceController.deleteProduce);

module.exports = router;

const express = require("express");
const router = express.Router();

const certController = require("../controllers/certification.controller");

console.log(" Certification routes loaded");

router.post("/", certController.createCertification);

router.get("/", certController.getCertifications);

router.get("/:id", certController.getCertifications);

router.put("/:id", certController.updateCertification);

router.delete("/:id", certController.deleteCertification);

module.exports = router;

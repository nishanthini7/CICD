const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Auth
router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

// CRUD
router.post("/create", adminController.createAdmin);
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;

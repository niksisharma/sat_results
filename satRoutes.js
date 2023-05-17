const express = require("express");
const router = express.Router();

const satController = require("./satcontroller");

router.post("/insert", satController.insertData);
router.get("/view", satController.viewData);
router.get("/rank/:name", satController.getRank);
router.put("/update/:name", satController.updateScore);
router.delete("/delete/:name", satController.deleteRecord);

module.exports = router;

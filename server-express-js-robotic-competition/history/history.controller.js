const express = require("express");
const router = express.Router();
const historyService = require('./history.service')


router.get("/", async (req, res) => {
	const histories = await historyService.getHistories()
	return res.json({ histories })
});

router.get("/:id", async (req, res) => {
	const id = req.params.id
	const history = await historyService.getHistory(id)
	return res.json(history)
});


router.get("/by/team/:id", async (req, res) => {
	const histories = await historyService.getAllByTeam(req.params.id)
	return res.json(histories)
});

router.post("/", async (req, res) => {
	const history = await historyService.createHistory(req.body)
	return res.json(history)
});

router.post("/bulk", async (req, res) => {
	const history = await historyService.createBulkHistory(req.body)
	return res.json(history)
});

router.delete("/:id", async (req, res) => {
	const resp = await historyService.deleteHistory(req.params.id)
	return res.json({ success: true, msg: "delete successfuly", data: resp }
	)
});

module.exports = router;

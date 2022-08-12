const express = require("express");
const router = express.Router();
const teamService = require('./team.service')

router.get("/", async (req, res) => {
	const teams = await teamService.getTeams()
	return res.json(teams)
});

router.get("/:id", async (req, res) => {
	const team = await teamService.getTeam(req.params.id)
	return res.json(team)
});

router.post("/", async (req, res) => {
	const team = await teamService.createTeam(req.body)
	return res.json(team)
});

router.post("/bulk", async (req, res) => {
	const team = await teamService.createBulkTeam(req.body)
	return res.json(team)
});



router.patch("/", async (req, res) => {
	const teams = await teamService.updateTeam(req.body)
	return res.json(teams)
});

router.delete("/:id", async (req, res) => {
	const teams = await teamService.deleteTeam(req.params.id)
	return res.json(teams)
});

module.exports = router;

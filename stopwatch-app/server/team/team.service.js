const { Team } = require("../models");

exports.getTeam = async (id) => {
	try {
		return await Team.findOne({ where: { id } })
	} catch (error) {
		throw new Error()
	}
}
exports.getTeams = async () => {
	try {
		return await Team.findAll()
	} catch (error) {
		throw new Error()
	}
}

exports.createTeam = async (body) => {
	try {
		return await Team.create(body)
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.createBulkTeam = async (body) => {
	try {
		return await Team.bulkCreate(body)
	} catch (error) {
		throw new Error()
	}
}

exports.updateTeam = async (body) => {
	try {
		return await Team.update({ ...body }, { where: { id: body?.id } })
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
		throw new Error()
	}
}


exports.deleteTeam = async (id) => {
	try {
		return await Team.destroy({ where: { id } })
	} catch (error) {
		throw new Error()
	}
}
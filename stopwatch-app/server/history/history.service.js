const { History } = require("../models");

exports.getHistories = async () => {
	try {
		return await History.findAll()
	} catch (error) {
		throw new Error()
	}
}
exports.getHistory = async (id) => {
	try {
		return await History.findOne({ where: { id } })
	} catch (error) {
		throw new Error()
	}
}

exports.getAllByTeam = async (teamId) => {
	try {
		return await History.findOne({ where: { teamId } })
	} catch (error) {
		throw new Error()
	}
}

exports.createHistory = async (body) => {
	try {
		return await History.create(body)
	} catch (error) {
		throw new Error()
	}
}

exports.createBulkHistory = async (body) => {
	try {
		return await History.bulkCreate(body)
	} catch (error) {
		throw new Error()
	}
}

exports.deleteHistory = async (id) => {
	try {
		return await History.destroy({ where: { id } })
	} catch (error) {
		throw new Error()
	}
}
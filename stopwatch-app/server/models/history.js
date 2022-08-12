module.exports = (sequelize, DataTypes) => {
	const History = sequelize.define("History", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV1,
		},
		timestamp: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	History.associate = (models) => {
		History.belongsTo(models.Team);
	};
	return History;
}
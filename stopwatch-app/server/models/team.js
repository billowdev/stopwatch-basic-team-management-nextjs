module.exports = (sequelize, DataTypes) => {
	const Team = sequelize.define("Team", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV1,
		},
		number: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		school: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});

	Team.associate = (models) => {
		Team.hasMany(models.History, {
			onDelete: "cascade"
		});
	};

	return Team;
};

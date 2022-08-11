const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const db = require("./models");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//config for only development
if (process.env.NODE_ENV === 'development') {
	// Cors it's allow to deal with react for localhost at port {CLIENT PORT} without any problem
	app.use(cors({
		origin: process.env.CLIENT_URL
	}))

	// Morgan give information about each requrest
	app.use(morgan('dev'))
}

// Routers
const historyRoute = require("./history/history.controller");
app.use("/history", historyRoute);

const teamRoute = require("./team/team.controller");
app.use("/team", teamRoute);


db.sequelize.sync().then(() => {
	app.listen(3333, () => {
		console.log(`SERVE ON PORT ${3333}`);
	});
});
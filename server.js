require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const User = require("./models/userModel");  // ✅ Import User model

const signupRoute = require("./modules/signup");
const loginRoute = require("./modules/login");
const logoutRoute = require("./modules/logout");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", signupRoute);
app.use("/api/v1", loginRoute);
app.use("/api/v1", logoutRoute);

// ✅ Sync the database after loading models
sequelize.sync({ alter: true }) // ✅ Keeps data while updating structure
    .then(() => console.log("✅ Database synchronized..."))
    .catch((err) => console.error("❌ Database sync error: ", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

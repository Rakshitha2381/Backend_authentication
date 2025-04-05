const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { hashPassword } = require("../crypt/bcrypt");

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

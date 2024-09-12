const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Hiteshisagoodb$oy'; 

const login = [
    body('email', 'Please enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
];

module.exports = login;

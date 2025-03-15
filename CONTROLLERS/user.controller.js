
const jwt = require('jsonwebtoken');
const db = require('../MODELS');
const User = require('../MODELS/user.model');


// Generate JWT token hhhhh
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register new admin
exports.register = async (req, res) => {

    try {

        const { firstName, lastName, email, phone, password, role } = req.body;
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: 'Email already exists' });
        }

        // Create a new admin
        const newUser = await User.create({ firstName, lastName, email, phone, password, role });
        const token = generateToken(newUser._id);

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

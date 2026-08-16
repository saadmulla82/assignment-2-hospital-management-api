const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.register = async (request, response) => {
    try {
        const { username, email, password } = request.body;

        if (!username || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        response.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.login = (request, response, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error) {
            return response.status(500).json({ message: 'Something went wrong' });
        }
        if (!user) {
            return response.status(400).json({ message: info.message });
        }
        response.status(200).json({ message: 'Login successful' });
    })(request, response, next);
};

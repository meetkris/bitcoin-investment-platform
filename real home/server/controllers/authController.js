const users = require('../models/User');

exports.register = (req, res) => {
    const { email, password, role } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = { id: String(users.length + 1), email, password, role: role || 'user' };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, role: newUser.role } });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ token: 'dummy-jwt-token', user: { email: user.email, role: user.role } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Admin = db.admins;

// Generate JWT token hhhhh
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register new admin
exports.registerAdmin = async (req, res) => {

  try {
    // const { permissions: userPermissions } = req.user;
    // if (userPermissions.users !== 'write' && userPermissions.users !== 'readwrite') {
    //   return res.status(403).json({ error: 'Unauthorized: Insufficient permissions to register Admin' });
    // }
    const { firstname, lastname, email, phone, password, permissions } = req.body;
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    // Create a new admin
    const newAdmin = await Admin.create({ firstname, lastname, email, phone, password });
    const token = generateToken(newAdmin._id);

    res.status(201).json({
      _id: newAdmin._id,
      firstname: newAdmin.firstname,
      lastname: newAdmin.lastname,
      email: newAdmin.email,
      phone: newAdmin.phone,
      // permissions: newAdmin.permissions,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      _id: admin._id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      permissions: admin.permissions,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

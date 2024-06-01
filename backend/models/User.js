// ./models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  name: String,
  email: String,
  password: String,
  // Add other fields as needed
});

// Define static method to create admin user if needed
userSchema.statics.createAdminIfNeeded = async function() {
  const adminUser = await this.findOne({ role: 'admin' });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Hashing default password
    await this.create({ name: 'Admin', email: 'admin@example.com', password: hashedPassword, role: 'admin' });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;

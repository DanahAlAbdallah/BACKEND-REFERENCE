const bcrypt = require('bcrypt');
const { ticketing, generalFinance } = require('.');

module.exports = (mongoose) => {
  const adminSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'coach'],
      default: 'user',
    },
    language: {
      type: String,
      default: 'English',
    },
    age: {
      type: Number,
      required: true,
    },
    permissions: {
      ticketing: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return mongoose.model('Admin', adminSchema);
};

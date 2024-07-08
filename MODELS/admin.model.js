const bcrypt = require('bcrypt');

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
    permissions: {
      ticketing: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      packages: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      visa: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      wholesalers: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      customers: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      recruitment: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      allreports: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      laborReports: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      generalExpense: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      generalFinance: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      generalExpenseRecruiting: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      generalFinanceRecruiting: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      users: {
        type: String,
        enum: ['read', 'write', 'readwrite', 'none'],
        default: 'none',
      },
      notes: {
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

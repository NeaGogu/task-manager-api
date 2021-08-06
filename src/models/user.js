const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be positive');
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if(value.length < 7) {
        throw new Error('password must be at least 6 characters long')
      }

      if(value.toLowerCase().includes('password')) {
        throw new Error('password cannot contain the word "password"');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer,

  }
}, {
  timestamps: true
})

// used for relationship between 2 entities, not actually saved in db
userSchema.virtual('tasks', {
  ref: 'task',
  localField:'_id', // where the local data is stored -> relationship betweeen _id and the Task owner field
  foreignField: 'owner' // name of the field that's gonna create the rel
})

// this works on individual instances
// we need 'THIS', that's why we have normal function
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token});
  await user.save();

  return token;

}

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}


// this works on the whole collection
userSchema.statics.findByCredentials= async (email, password) => {
  const user = await User.findOne({email});

  if(!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
}

// MIDDLEWARE
// Hash the plain text password before saving
// normal function because arrow functions do not bind 'this'
userSchema.pre('save', async function(next) {
  const user = this;
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({owner: user._id});

  next();
})

const User = mongoose.model('user', userSchema)

module.exports = User;
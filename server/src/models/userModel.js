import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: true, 
     unique: true, 
     lowercase: true,
     trim: true, 
     index: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true, 
  },

  fullname: { 
    type: String, 
    required: true,
    trim: true, 
  },

  avatar: {
    type: String,
    required: true
  },

  password: { 
    type: String, 
    required: [true, 'Password is required'] 
  },

  refreshtoken: { 
    type: String, 
  },

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Custom method to validate the password
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

// Custom method to generate Access Token
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
                {
                  _id: this._id,
                  email: this.email,
                  username: this.username,
                  fullname: this.fullname
                },
                  process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
  )
}

// Custom method to generate Refresh Token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
                {
                  _id: this._id,
                },
                  process.env.REFRESH_TOKEN_SECRET,
                {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY
                }
  )
}

export default mongoose.model('User', userSchema);

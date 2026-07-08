const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
})

userSchema.pre('save', async function(next){
    const user = this;
  
    if(!user.isModified('password')) return;
    
    try{
       
        const salt           = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password        = hashedPassword;
  
    }
    catch(err){
  
        throw err;
  
    }
  })
  
  userSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
  }  

const User     = mongoose.model('User', userSchema);
module.exports = User;
const mongoose=require("mongoose");
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
      type:String,
      default:'name'
    },
    university: {
        type: String,
        required: true
      },
      // Roll number of the user, a required string field
      rollNo: {
        type: String,
        required: true
      },
    username:{ 
      type: String,
      required: true
     },
    password: {
        type: String,
        required: true
      },
      gmail: {
        type: String,
        required: true
      },
      // Mentor's ID, a reference to the 'mentor' collection
      mentorId: {
        type: String,
        default: 'defaultMentorId'

      },
      projectNo: {
        type: Number,
        required: true,
        default: 0
    }
    
});
userSchema.pre('save', async function (next) {
    const user = this;
  
    // Hash the password
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      
      next();
    } catch (error) {
      return next(error);
    }
  
  });
  
  
  const User = mongoose.model('user', userSchema);
  
  module.exports = User;
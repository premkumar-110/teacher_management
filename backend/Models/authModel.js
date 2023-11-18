const mongoose=require('mongoose');
const validator=require('validator')
const bcryptjs = require('bcryptjs');

mongoose.connect('mongodb+srv://admin:VTH8dXLG4aENn7vZ@cluster0.qprskym.mongodb.net/users?retryWrites=true&w=majority',{
    useNewUrlParser:true,
}).then((conn)=>{
    console.log("Connection Successful")
})

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, " Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        select:false
    },
    name: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      address: {
        type: String
      },
      cart:{
        type:Array
      },
      purchased:{
        type:Array
      }
})
   
  const User=mongoose.model('User',userSchema);
  
  module.exports=User;
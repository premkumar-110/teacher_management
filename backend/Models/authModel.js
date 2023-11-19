const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://admin:VTH8dXLG4aENn7vZ@cluster0.qprskym.mongodb.net/teacherDB?retryWrites=true&w=majority',{})
.then((conn)=>{
    console.log("Connection Successful")
})

const teacherSchema=new mongoose.Schema({
  fullName:{
        type:String,
        required:[true,"Name is required"],
    },
    age:{
        type:Number,
        required:[true,"Password is Required"]
    },
    dateOfBirth: {
        type: String
      },
      numberOfClasses: {
        type: String
      },
})
   
  const Teacher=mongoose.model('User',teacherSchema);
  
  module.exports=Teacher;
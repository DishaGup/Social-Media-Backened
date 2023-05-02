const mongoose=require("mongoose")

let registerSchema=mongoose.Schema({
    name: {type:String,require:true},
email: {type:String,require:true},
gender: {type:String,require:true},
password : {type:String,require:true},
})

let RegisterModel=mongoose.model("users",registerSchema)

module.exports={
    RegisterModel,registerSchema
}

/**
 *  "name":"gupta",
  "email":"gupta@gmail.com",
  "gender":"female",
  "password":"gupta@123"
 */
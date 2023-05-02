const mongoose=require("mongoose")

let postSchema=mongoose.Schema({
title : {type:String,require:true},
body : {type:String,require:true},
device : {type:String,require:true,enum:["PC", "TABLET", "MOBILE"]},
userID :{type:String,require:true},
user:{type:String,require:true}
})

let PostModel=mongoose.model("posts",postSchema)

module.exports={
    PostModel,postSchema
}

/**
 *  "title" : "study",
"body" : "chap 1",
"device" : "PC"
 */
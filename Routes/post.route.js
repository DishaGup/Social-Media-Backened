const express=require("express")
const {  PostModel,postSchema} =require("../Model/post.model")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const postRouter=express.Router()
postRouter.use(express.json())

postRouter.get('/',async(req,res)=>{
let data=await PostModel.find({userID:req.body.userID})
res.json({"msg":"user",data:data})
 
})


postRouter.post('/create',async(req,res)=>{
    let {userID,user}=req.body
try {
    let newPost=new PostModel({...req.body,user,userID})
    console.log(newPost)
res.json({"msg":"post created",data:newPost})

} catch (error) {
    res.send({err:error.message})
}

})

postRouter.patch('/update/:ids',async(req,res)=>{
const {ids}=req.params
    try {
    await PostModel.findByIdAndUpdate({_id:ids},req.body)
 res.json({"msg":"post updated"})

} catch (error) {
    res.send({err:error.message,"msg":"post not updated"})
}

})

postRouter.delete('/delete/:ids',async(req,res)=>{
    const {ids}=req.params
        try {
        await PostModel.findByIdAndDelete({_id:ids},req.body)
     res.json({"msg":"post deleted"})
    
    } catch (error) {
        res.send({err:error.message,"msg":"post not deleted"})
    }
    
    })
    
module.exports={
    postRouter
}
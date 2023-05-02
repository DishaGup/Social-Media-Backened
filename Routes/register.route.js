const express=require("express")
const {  RegisterModel,registerSchema} =require("../Model/register.model")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const registerRouter=express.Router()
registerRouter.use(express.json())

registerRouter.get('/',async(req,res)=>{
 let data=await RegisterModel.find()
    res.json({"data":data})
})

registerRouter.post('/register',async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body
        bcrypt.hash(password, 3, async function(err, hash) {
if(err) throw new Error("hash not working")
let addUser=new RegisterModel({name,email,gender,password:hash})
await addUser.save()
res.json({"msg":"user registered",data:addUser})
            
        });
    } catch (error) {
        res.send(error.message)
 res.json({"err":"user not registered"})
    }
})

registerRouter.post('/login',async(req,res)=>{

try {
const {email,password}=req.body
let addUser=await RegisterModel.findOne({email:email})
bcrypt.compare(password, addUser.password, function(err, result) {
    if(result){
        var token = jwt.sign({userID:addUser._id,user:addUser.name}, 'masai');
     res.status(200).send({"msg":"user Found",token:token})
    }else{
        res.status(200).send({"msg":"Wrong credentials"})
    }
})
    
} catch (error) {
    res.send(error.message)
    res.json({"err":"user not login"})
}


})


registerRouter.patch('/update/:ids',async(req,res)=>{
    const {ids}=req.params
        try {
        await RegisterModel.findByIdAndUpdate({_id:ids},req.body)
     res.json({"msg":"post updated"})
    
    } catch (error) {
        res.send({err:error.message,"msg":"post not updated"})
    }
    
    })
    
    registerRouter.delete('/delete/:ids',async(req,res)=>{
        const {ids}=req.params
            try {
            await RegisterModel.findByIdAndDelete({_id:ids},req.body)
         res.json({"msg":"post deleted"})
        
        } catch (error) {
            res.send({err:error.message,"msg":"post not deleted"})
        }
        
        })


module.exports={
    registerRouter
}
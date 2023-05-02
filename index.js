const express=require("express")
const {connection} =require("./Config/connection")
const app=express()
const {registerRouter}=require("./Routes/register.route")
const {postRouter} =require("./Routes/post.route")
const { logger}=require("./Middleware/logger.middleware")
require('dotenv').config()
app.use(express.json())

app.use('/users',registerRouter)
app.use(logger)
app.use('/posts',postRouter)
 app.get('/',(req,res)=>{
     res.send("hi")
 })


app.listen(process.env.PORT,async()=>{
try {
    await connection
    console.log("mondoDB connected")
} catch (error) {
 console.log(error) 
 console.log("mongodb not connected")   
}
console.log("server at 3000")



})
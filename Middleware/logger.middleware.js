const jwt = require('jsonwebtoken');


const logger =(req,res,next)=>{
    console.log(req.body)
var token=req.headers.authorization

if(token){
try {
    const decoded=jwt.verify(token.split(" ")[1],"masai")
    if(decoded){
        req.body.userID=decoded.userID,
        req.body.user=decoded.user
     next()
    }else{
res.send({"msg":"Login First"})
    }


} catch (error) {
    res.send({"msg":error.message})
}

}else{
    res.send({"msg":"No Token--false"})
}


}

module.exports={
    logger
}
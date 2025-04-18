
const jwt=require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
         // get bearer token form headers request
         const bearerToken=req.headers.authorization;
            // if token not avaliable 
            if(!bearerToken)
            {
                return res.send({message:"Unauthorized access.Plz login to continue"})
            }
            //extract toke
           const token= bearerToken.split(' ')[1]
           try{
            jwt.verify(token,process.env.SECRET_KEY);
            next()
           }
           catch(err)
           {
            next(err)
           }
}
module.exports=verifyToken;
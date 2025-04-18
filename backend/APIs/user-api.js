// user app 
const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken=require('../Middleware/verifyToken')
// get usercollections
let userscollections;
let articlescollections
userApp.use((req, res, next) => {
    userscollections = req.app.get('userscollections')
    articlescollections=req.app.get('articlescollections')
    next();
})

// register user
userApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newuser = req.body;
    const dbuser = await userscollections.findOne({ username: newuser.username }); 

    if (dbuser != null) {
        res.send({ message: "user Already Exists" });
    } else {
        // hash the password
        const hashedpassword = await bcryptjs.hash(newuser.password, 6); // ✅ fixed: added await
        // replace
        newuser.password = hashedpassword
        // insert into db
        await userscollections.insertOne(newuser);
        // res
        res.send({ message: "user created" })
    }
}))

// login user
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const usercred = req.body;
  
    const dbuser = await userscollections.findOne({ username: usercred.username });
  
    if (dbuser === null) {
      res.send({ message: "Invalid username" });
      return;
    }
  
    // Check if user is blocked
    if (dbuser.status === false) {
      res.send({ message: "You are blocked by admin" });
      return;
    }
  
    // Validate password
    const status = await bcryptjs.compare(usercred.password, dbuser.password);
  
    if (status) {
      // Create JWT token
      const signedtoken = jwt.sign(
        { username: dbuser.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      delete dbuser.password;
  
      res.send({ message: "login success", token: signedtoken, user: dbuser });
    } else {
      res.send({ message: "Invalid password" });
    }
  }));
  


// get articles
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
   // get articles collection 
  const  articlescollections=req.app.get("articlescollections");

    let articlesList= await articlescollections.find({status:true}).toArray()
        res.send({message:"articles list",payload:articlesList})

}))


// post comments
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
        // get comment obj 
        const usercomment=req.body;
        const articleId=(+req.params.articleId);
     
        //add comment to articlecollection comments array by id
        const result = await articlescollections.updateOne(
            { articleId:articleId },
            { $addToSet: { comments: usercomment } }
          );    
         
        res.send({message:"Comment Posted"})
}))

// export userApp
module.exports = userApp;

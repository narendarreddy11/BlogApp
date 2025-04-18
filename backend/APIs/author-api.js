// user app 
const exp = require('express')
const authorApp = exp.Router()
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken=require('../Middleware/verifyToken')
// get usercollections
let authorscollections;
let articlescollections;
authorApp.use((req, res, next) => {
    authorscollections = req.app.get('authorscollections')
   articlescollections=req.app.get('articlescollections')
    next();
})

// register user
authorApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newuser = req.body;
    const dbuser = await authorscollections.findOne({ username: newuser.username }); 

    if (dbuser != null) {
        res.send({ message: "user Already Exists" });
    } else {
        // hash the password
        const hashedpassword = await bcryptjs.hash(newuser.password, 6); // ✅ fixed: added await
        // replace
        newuser.password = hashedpassword
        // insert into db
        await authorscollections.insertOne(newuser);
        // res
        res.send({ message: "user created" })
    }
}))

// login user
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const usercred = req.body;
    const dbuser = await authorscollections.findOne({ username: usercred.username }); 
    
    if(dbuser.status === false )
    {
        res.send({message:"you are blocked by admin"})
    }
    if (dbuser === null) {
        res.send({ message: "Invalid username" })
    } else {
        const status = await bcryptjs.compare(usercred.password, dbuser.password) //  compare needs await
        if (status) {
            // create jwt token
            const signedtoken = jwt.sign({ username: dbuser.username }, process.env.SECRET_KEY, { expiresIn: '1h' })

            delete dbuser.password; //  remove hashed password before sending user object

            res.send({ message: "login success", token: signedtoken, user: dbuser })
        } else {
            res.send({ message: "invalid Password" });
        }
    }
}))




// add article
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get article from client
    const newarticle=req.body;
    await articlescollections.insertOne(newarticle)
    res.send({message:"new article created"})

}))

// modify article
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifed=req.body;
    // update by article id
    const result=await articlescollections.updateOne({articleId:modifed.articleId},{$set:{...modifed}});
    console.log(result);
    let latestArticle=await articlescollections.findOne({articleId:modifed.articleId})
    res.send({message:"Article updated",larticle:latestArticle})

}))



// soft delete 

authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler( async(req,res)=>{
    const articlefromurl=(+req.params.articleId);
    console.log(req.body);
    // updt
    const articletodelete=req.body;
    if(articletodelete.status===true)
    { 
      let modifiedArt= await articlescollections.findOneAndUpdate({articleId:articlefromurl},{$set:{...articletodelete,status:false}},{returnDocument:"after"})
      res.send({message:"article deleted",payload:modifiedArt.status})

    }
    if(articletodelete.status===false)
    {
        let modifiedArt= await articlescollections.findOneAndUpdate({articleId:articlefromurl},{$set:{...articletodelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
  
    }
   
}))
// authorApp.put('/article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
//     const articleId = +req.params.articleId; // Ensure it is numeric, if possible
//     const articletodelete = req.body;
//     console.log(articletodelete);

//     try {
//         // Find the article by articleId and update its status
//         if (articletodelete.status === true) {
//             const modifiedArt = await articlescollections.findOneAndUpdate(
//                 { articleId: articleId },
//                 { $set: { ...articletodelete, status: false } },
//                 { returnDocument: "after" } // Ensures the modified document is returned
//             );
//             if (modifiedArt) {
//                 res.send({ message:"article deleted", payload: modifiedArt.status });
//             } else {
//                 res.status(404).json({ message: "Article not found" });
//             }
//         }
//         else if (articletodelete.status === false) {
//             const modifiedArt = await articlescollections.findOneAndUpdate(
//                 { articleId: articleId },
//                 { $set: { ...articletodelete, status: true } },
//                 { returnDocument: "after" } // Ensures the modified document is returned
//             );
//             if (modifiedArt) {
//                 res.send({ message:"article restored", payload: modifiedArt.status });
//             } else {
//                 res.status(404).json({ message: "Article not found" });
//             }
//         } else {
//             res.status(400).json({ message: "Invalid status" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }));



// read articls of particular author
// read articles of particular author
authorApp.get('/articles/:username', verifyToken,expressAsyncHandler(async (req, res) => {
    const authorname = req.params.username;
    const articlesList = await articlescollections.find(
        
            { username: authorname },
           
        
    ).toArray(); // <-- needed!

    res.send({ message: "articles", payload: articlesList });
}));


// export authorApp
module.exports = authorApp;

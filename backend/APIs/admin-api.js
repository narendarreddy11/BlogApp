const express = require('express');
const adminApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../Middleware/verifyToken');

// Collections
let userscollections;
let articlescollections;
let adminscollections;
let authorscollections;

// Attach collections from app
adminApp.use((req, res, next) => {
  userscollections = req.app.get('userscollections');
  articlescollections = req.app.get('articlescollections');
  authorscollections = req.app.get('authorscollections');
  adminscollections = req.app.get('adminscollections');
  next();
});

// ========================== ADMIN LOGIN ==========================
adminApp.post('/Adminlogin', expressAsyncHandler(async (req, res) => {
  const usercred = req.body;
  const dbuser = await adminscollections.findOne({ username: usercred.username });

  if (!dbuser) {
    res.send({ message: "Invalid username" });
  } else {
    const status = await bcryptjs.compare(usercred.password, dbuser.password);
    if (status) {
      const signedtoken = jwt.sign(
        { username: dbuser.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      delete dbuser.password;
      res.send({ message: "login success", token: signedtoken, user: dbuser });
    } else {
      res.send({ message: "invalid Password" });
    }
  }
}));

// ========================== USERS LIST ==========================
adminApp.get('/usersList', verifyToken, expressAsyncHandler(async (req, res) => {
  const userList = await userscollections.find().toArray();
  if (userList.length === 0) {
    res.send({ message: "No users" });
  } else {
    res.send({ message: "UsersList", payload: userList });
  }
}));

// ========================== AUTHORS LIST ==========================
adminApp.get('/authorsList', verifyToken, expressAsyncHandler(async (req, res) => {
  const authorsList = await authorscollections.find().toArray();
  if (authorsList.length === 0) {
    res.send({ message: "No Authors" });
  } else {
    res.send({ message: "UsersList", payload: authorsList });
  }
}));

// ========================== ARTICLES LIST ==========================
adminApp.get('/AllArticles', verifyToken, expressAsyncHandler(async (req, res) => {
  const ArticlesList = await articlescollections.find().toArray();
  if (ArticlesList.length > 0) {
    res.send({ message: "Article List", payload: ArticlesList });
  } else {
    res.send({ message: "No Articles Yet" });
  }
}));

// ========================== BLOCK / UNBLOCK USER OR AUTHOR ==========================
adminApp.put('/userauthorblock', verifyToken, expressAsyncHandler(async (req, res) => {
  const { username, userType } = req.body;

  let dbCollection =
    userType === 'user' ? userscollections : authorscollections;

  const dbUser = await dbCollection.findOne({ username });

  if (!dbUser) {
    res.send({ message: `${userType} not found` });
    return;
  }

  const newStatus = !dbUser.status;

  await dbCollection.updateOne(
    { username },
    { $set: { status: newStatus } }
  );

  res.send({
    message: `${userType} ${newStatus ? 'unblocked' : 'blocked'} successfully`,
    status: newStatus,
  });
}));

// =====================Delete Article==============
adminApp.put('/deletearticle', verifyToken, expressAsyncHandler(async (req, res) => {
  const { articleId } = req.body;


  const deletedDoc = await articlescollections.findOneAndDelete({ articleId: articleId });
  if (deletedDoc) {
      res.send({ message: "deleted article" });
  } else {
      res.send({ message: "not deleted" });
  }
  
}));



// ========================== EXPORT ROUTER ==========================
module.exports = adminApp;

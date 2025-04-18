const exp = require('express');
const app = exp();
require('dotenv').config();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bcryptjs = require('bcryptjs');
const cors = require('cors');  // Import CORS package

// Enable CORS for all routes
app.use(cors());  // This will allow all origins to access the server

// Serve React build (frontend)
app.use(exp.static(path.join(__dirname, '../client/build')));

// To parse JSON bodies
app.use(exp.json());

// Connect to MongoDB
MongoClient.connect(process.env.DB_URL)
  .then(async client => {
    const blogapp = client.db('blogapp');

    // Get collections
    const userscollections = blogapp.collection('userscollections');
    const articlescollections = blogapp.collection('articlescollections');
    const authorscollections = blogapp.collection('authorscollections');
    const adminscollections = blogapp.collection('adminscollections');

    // Share collections with the app
    app.set('userscollections', userscollections);
    app.set('articlescollections', articlescollections);
    app.set('authorscollections', authorscollections);
    app.set('adminscollections', adminscollections);

    // Insert default admin if not exists
    const existingAdmin = await adminscollections.findOne({ username: process.env.ADMIN_USERNAME });
    if (!existingAdmin) {
      const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD, 8);
      await adminscollections.insertOne({
        userType: "admin",
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        status: true
      });
    }
  })
  .catch(err => {
    // Only log error for server side tracking
    console.error("Database connection failed:", err);
  });

// Import API routes
const userApp = require('./APIs/user-api');
const adminApp = require('./APIs/admin-api');
const authorApp = require('./APIs/author-api');

// Route handling
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

// Serve frontend for SPA fallback
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: "error", payload: err.message });
});

// Start server
app.listen(process.env.PORT);

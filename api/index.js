const express = require('express')
const cors = require('cors')
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const MongoClient = require('mongodb').MongoClient
const app = express()
const User = require('./models/user')
// const Blog = require('./models/blog')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const port = 5000
const authRoutes = require('./auth');
const profileRoutes = require('./user');
const blogRoutes = require('./blog')
app.use(express.json());
app.use(
  cors({
    // origin:'http://localhost:5173',
    origin:'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
  );
  app.use('/auth', authRoutes);
  app.use('/user', profileRoutes);
  app.use('/blog', blogRoutes);
    
    // Connect to MongoDB
mongoose.connect(process.env.Mongo_Url)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

//   app.post('/register', async (req,res) => {
//     const{
//         fullname,
//         email,
//         password,
//         bio,
//       } = req.body;
//     console.log({fullname, email, password, bio,})
//     try {
//     await User.create({
//         fullname,
//         email,
//         password:bcrypt.hashSync(password, bcryptSalt),
//         bio,
//       });
//       res.json("Greap");
//     } catch (e) {
//       res.status(422).json(e);
//     }
  
//   });


  
// app.post('/login', async (req,res) => {
//     const {email,password} = req.body;
//     const userDoc = await User.findOne({email});
//     if (userDoc) {
//       const passOk = bcrypt.compareSync(password, userDoc.password);
//       if (passOk) {
//         jwt.sign({
//           email:userDoc.email,
//           id:userDoc._id
//         }, jwtSecret, {}, (err,token) => {
//           if (err) throw err;
//           res.cookie('token', token).json(userDoc);
//         });
//       } else {
//         res.status(422).json('pass not ok');
//       }
//     } else {
//       res.json('not found');
//     }
//   });

//   app.get('/profile', (req,res) => {
//     const {token} = req.cookies;
//     if (token) {
//       jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         const {name,email,_id} = await User.findById(userData.id);
//         res.json({name,email,_id});
//       });
//     } else {
//       res.json(null);
//     }
//   });

// Routes

  
// app.listen(port, () => console.log(`Example app listening on port ${port}'`))
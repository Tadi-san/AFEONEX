const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const bcryptSalt = bcrypt.genSaltSync(10);
const router = express.Router();
const User = require('./models/user');
const Blog = require('./models/blog');

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg'; // Update with your own secret

router.get('/', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      try {
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      } catch (error) {
        res.status(404).json('User not found');
      }
    });
  } else {
    res.json(null);
  }
});

router.get('/blog/:id', async(req, res)=>{
const {id} = req.params
// const blogData = await Blog.findById(id)
// if (blogData){
    const user = await User.findById(id); // Retrieve the user document by ID
      const blogsIds = user.blogs; // Access the post array property
      const blogs = await Blog.find({ _id: { $in: blogsIds } });
        res.json(blogs)
// }

})

router.post('/edit', async(req,res)=>{
  const {
    id,
    fullname,
    email,
    bio,
    github,
    instagram,
    linkedin,
    x,
    telegram,
  } = req.body
console.log(id)
  const user = await User.findById(id)
  if (!user){
    res.json("no user found")
  }
  else{
    user.set({fullname:fullname,
        email:email,
        bio:bio,
        github:github,
        instagram:instagram,
        linkedin:linkedin,
        x:x,
        telegram:telegram,
      })
      await user.save()
      res.json(user)
  }
})

module.exports = router;
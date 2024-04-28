const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Blog = require('./models/blog');
const User = require('./models/user')
const uploadImage = require('./controlers/uploadImage')

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg'; // Update with your own secret


router.post('/', async (req,res)=>{
  const {filter} = req.body
  if (filter==""){
    res.json(await Blog.find())
  }
  else{
    res.json(await Blog.find({ category: filter }))
  }
})

router.post('/search', async (req, res) => {
  const { searchValue } = req.body;
  const regex = new RegExp(searchValue, 'i'); // 'i' flag for case-insensitive search
  res.json(await Blog.find({ title: { $regex: regex } }));
});


router.get('/:id', async(req, res)=>{
  const {id} = req.params
  const blog = await Blog.findById(id)
  if (blog){
    res.json(blog)
  }
  
})

router.post('/post', (req, res) => {
        const {token} = req.cookies
        const {title, content} = req.body
        jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
                    try{
                        const blog = await Blog.create({
                            author:userData.id,
                            authorName:userData.fullname,
                            title,
                            content
                        })
                        res.json(blog)
                    } 
                    catch(err){
                        res.json(err)
                    }      
                    })
    })

    router.get('/cheak/:id', async (req,res)=>{
        const {id}  = req.params 
        const blog = await Blog.findById(id);
        try {
          if (!blog) {
            return res.status(404).json({ error: 'Option not found' });
          }
          
          const {title, content} = blog
                
          res.json(blog);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
    })
    router.post('/upload', (req,res) =>{
        uploadImage(req.body.image).then(url => res.json(url)).catch(err => res.status(500).json(err))
        })
    
    router.post('/uploadImage', (req,res) =>{
    uploadImage(req.body.image).then(url => res.json(url)).catch(err => res.status(500).json(err))
    
    })

    router.post('/publish', async (req, res) => {
      const { image, category, id } = req.body;
    
      try {
        const blog = await Blog.findById(id);
        await blog.set({ image: image, category: category });
        await blog.save();
        const user = await User.findById(blog.author);
        user.blogs.push(id);
        await user.save();
        res.json(blog);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }); 
    

    router.post('/update', async (req, res) => {
      const { title, content, id } = req.body;
    
      try {
        const blog = await Blog.findById(id);
        blog.set({ title:title, content:content, });
        await blog.save();
        res.json(blog);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    router.post('/delete', async (req, res) => {
      const {id} = req.body
      await Blog.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send('Blog deleted successfully');
      })
      .catch(err => {
        res.status(500).send('Error deleting blog');
      });
    })

    router.post('/comment', async(req,res)=>{
      const {id, comment} = req.body
      const blog = await Blog.findById(id)
      if(blog){
        blog.comment = comment
        await blog.save()
        res.json(blog)
      }
      else(
        res.json("blog not found")
      )
    })

  module.exports = router;
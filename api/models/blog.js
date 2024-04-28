const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author: {type:mongoose.Schema.Types.ObjectId, ref:'User',},
  title: {
    type: String,
    
  },
  image:String,
  
  content: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  category:String,

  authorName:String,

  comment:[String]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
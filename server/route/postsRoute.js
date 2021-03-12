const e = require('express');
const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async (req, res, next) => {
  try {
    const posts = await postsService.getPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/posts/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await postsService.getPost(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/posts', async (req, res, next) => {
  try {
    const post = req.body;
    const newPost = await postsService.savePost(post);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

router.put('/posts/:id', async (req, res, next) => {  
  try {
    const post = req.body;
    const id = req.params.id;
    await postsService.updatePost(id, post);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/posts/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await postsService.deletePost(id);
    res.status(204).end();

  } catch (error) {
    next(error);
  }
});

router.delete('/posts', async (req, res, next) => {
  try {
    await postsService.deleteAllPosts();
    res.status(204).end();
    
  } catch (error) {
    next(error);
  }
})

module.exports = router;
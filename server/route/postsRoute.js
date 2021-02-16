const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async (req, res) => {
  const posts = await postsService.getPosts();
  res.json(posts);
});

router.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await postsService.getPost(id);
  res.json(post);
});

router.post('/posts', async (req, res) => {
  const post = req.body;
  const newPost =  await postsService.savePost(post);
  res.json(newPost);
});

router.put('/posts/:id', async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  await postsService.updatePost(id, post);
  res.end();
});

router.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  await postsService.deletePost(id);
  res.end();
});

module.exports = router;
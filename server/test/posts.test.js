const axios = require('axios');
const crypto = require('crypto');
const postService = require('../service/postsService');

const generate = () => {
  return crypto.randomBytes(20).toString('hex');
}

const request = (url, method, data) => {
  return axios({ url, method, data });
}

// test.only - testa exclusivamente este teste
test('Should get posts', async () => {
  // given - dado que
  const post1 = await postService.savePost({ title: generate(), content: generate() });
  const post2 = await postService.savePost({ title: generate(), content: generate() });
  const post3 = await postService.savePost({ title: generate(), content: generate() });

  // when - quando acontecer
  const response = await request('http://localhost:3001/posts', 'get');
  const posts = response.data;

  // then - então
  expect(posts).toHaveLength(3);
  await postService.deletePost(post1.id);
  await postService.deletePost(post2.id);
  await postService.deletePost(post3.id);
});

test('Should save post', async () => {
  // given - dado que
  const data = { title: generate(), content: generate() };

  // when - quando acontecer
  const response = await request('http://localhost:3001/posts', 'post', data);
  const post = response.data;

  // then - então
  expect(post.title).toBe(data.title);
  expect(post.content).toBe(data.content);
  await postService.deletePost(post.id);
});

test('Should update post', async () => {
  // given - dado que
  const post = await postService.savePost({ title: generate(), content: generate() });
  post.title = generate();
  post.content = generate();

  // when - quando acontecer
  await request(`http://localhost:3001/posts/${post.id}`, 'put', post);
  const updatedPost = await postService.getPost(post.id);

  // then - então
  expect(post.title).toBe(updatedPost.title);
  expect(post.content).toBe(updatedPost.content);
  await postService.deletePost(post.id);
});

test('Should delete post', async () => {
  // given - dado que
  const post = await postService.savePost({ title: generate(), content: generate() });

  // when - quando acontecer
  await request(`http://localhost:3001/posts/${post.id}`, 'delete');
  const posts = await postService.getPosts();

  // then - então
  expect(posts).toHaveLength(0);
});
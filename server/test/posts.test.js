const axios = require('axios');
const crypto = require('crypto');

const postService = require('../service/postsService');

const baseUrl = 'http://localhost:3001';

const generate = () => {
  return crypto.randomBytes(20).toString('hex');
}

const request = (url, method, data) => {
  return axios({ url, method, data, validateStatus: false });
}

beforeAll(async () => {
  await request(`${baseUrl}/posts`, 'delete', {});
});

// test.only - testa exclusivamente este teste
test('Should get posts', async () => {
  // given - dado que
  const post1 = await postService.savePost({ title: generate(), content: generate() });
  const post2 = await postService.savePost({ title: generate(), content: generate() });
  const post3 = await postService.savePost({ title: generate(), content: generate() });

  // when - quando acontecer
  const response = await request(`${baseUrl}/posts`, 'get');
  const posts = response.data;

  // then - então
  expect(response.status).toBe(200);
  expect(posts).toHaveLength(3);
  await postService.deletePost(post1.id);
  await postService.deletePost(post2.id);
  await postService.deletePost(post3.id);
});

test('Should save post', async () => {
  // given - dado que
  const data = { title: generate(), content: generate() };

  // when - quando acontecer
  const response = await request(`${baseUrl}/posts`, 'post', data);
  const post = response.data;

  // then - então
  expect(response.status).toBe(201);
  expect(post.title).toBe(data.title);
  expect(post.content).toBe(data.content);
  await postService.deletePost(post.id);
});

test('Should not save post', async () => {
  // given - dado que
  const data = { title: generate(), content: generate() };

  // when - quando acontecer
  const response1 = await request(`${baseUrl}/posts`, 'post', data);
  const response2 = await request(`${baseUrl}/posts`, 'post', data);
  const post = response1.data;

  // then - então
  expect(response1.status).toBe(201);
  expect(response2.status).toBe(409);
  await postService.deletePost(post.id);
});

test('Should update post', async () => {
  // given - dado que
  const post = await postService.savePost({ title: generate(), content: generate() });
  post.title = generate();
  post.content = generate();

  // when - quando acontecer
  const response = await request(`${baseUrl}/posts/${post.id}`, 'put', post);
  const updatedPost = await postService.getPost(post.id);

  // then - então
  expect(response.status).toBe(204);
  expect(post.title).toBe(updatedPost.title);
  expect(post.content).toBe(updatedPost.content);
  await postService.deletePost(post.id);
});

test('Should not update post', async () => {
  const post = {
    id: 0
  }

  // when - quando acontecer
  const response = await request(`${baseUrl}/posts/${post.id}`, 'put', post);

  // then - então
  expect(response.status).toBe(404);
});

test('Should delete post', async () => {
  // given - dado que
  const post = await postService.savePost({ title: generate(), content: generate() });

  // when - quando acontecer
  const response = await request(`${baseUrl}/posts/${post.id}`, 'delete');
  const posts = await postService.getPosts();

  // then - então
  expect(response.status).toBe(204)
  expect(posts).toHaveLength(0);
});
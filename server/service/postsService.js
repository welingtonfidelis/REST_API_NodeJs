const postData = require('../data/postsData');

exports.getPosts = async () => {
  return postData.getPosts();
};

exports.getPost = async (id) => {
  const post = await postData.getPost(id);

  if (!post) throw new Error('Post not found');

  return post;
};

exports.savePost = async (post) => {
  const existingPost = await postData.getPostByTitle(post.title)

  if (existingPost) throw new Error('Post already exists');

  return postData.savePost(post);
};

exports.deletePost = (id) => {
  return postData.deletePost(id);
};

exports.deleteAllPosts = () => {
  return postData.deleteAllPosts();
};

exports.updatePost = async (id, post) => {
  await exports.getPost(id);
  
  return postData.updatePost(id, post);
};
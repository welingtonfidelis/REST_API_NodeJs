const postData = require('../data/postsData');

exports.getPosts = () => {
  return postData.getPosts();
};
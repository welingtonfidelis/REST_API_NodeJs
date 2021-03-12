const database = require('../infra/database');

exports.getPosts = () => {
  return database.query(
    'select * from blog.post;',
    []
  );
};

exports.getPost = (id) => {
  return database.oneOrNone(
    'select * from blog.post where id = $1;',
    [id]
  );
};

exports.getPostByTitle = (title) => {
  return database.oneOrNone(
    'select * from blog.post where title = $1;',
    [title]
  );
};

exports.savePost = (post) => {
  return database.one(
    'insert into blog.post (title, content) values($1, $2) returning *;',
    [post.title, post.content]
  );
};

exports.deletePost = (id) => {
  return database.none(
    'delete from blog.post where id = $1;',
    [id]
  );
};

exports.deleteAllPosts = () => {
  return database.none(
    'delete from blog.post;',
    []
  );
};

exports.updatePost = (id, post) => {
  return database.none(
    'update blog.post set title = $2, content = $3 where id = $1;',
    [id, post.title, post.content]
  );
};
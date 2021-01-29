const axios = require('axios');

test('Should get posts', async () => {
  const response = await axios({
    url: 'http://localhost:3001/posts',
    method: 'get'
  });

  const posts = response.data;

  expect(posts).toHaveLength(2);
  const [firstPost] = posts;
  expect(firstPost.id).toBe(1);
});
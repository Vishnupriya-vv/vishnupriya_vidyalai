const express = require('express');
const { fetchPosts } = require('./posts.service');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        try {
          const [imagesResponse, userResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`),
            axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
          ]);

          const images = imagesResponse.data;
          const user = userResponse.data;

          // Extract initials
          const userName = user.name.split(' ');
          const initials = `${userName[0][0]}${userName[1] ? userName[1][0] : ''}`;

          return {
            ...post,
            images: images.slice(0, 3).map(image => ({ url: image.url })),
            user: {
              name: initials,
              email: user.email
            }
          };
        } catch (error) {
          console.error(`Error fetching details for post ${post.id}:`, error);
          return {
            ...post,
            images: [],
            user: {
              name: 'N/A',
              email: 'N/A'
            }
          };
        }
      })
    );

    res.json(postsWithDetails);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

module.exports = router;

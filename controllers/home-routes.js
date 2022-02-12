const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['title', 'content'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true })) 
            console.log(posts)
            res.render('homepage', { posts })
        })
})

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;
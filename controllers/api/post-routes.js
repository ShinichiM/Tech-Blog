const { Post, User } = require('../../models');
const router = require('express').Router();
const sequelize = require('../../config/connection');

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => res.json(postData))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['title', 'content', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(400).json({ message: 'Could not find post with that ID'});
                return;
            }
            res.json(postData)
        })
        .catch(err => res.status(500).json(err));
})

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id 
    })
        .then(postData => res.json(postData))
        .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title
    },
    {
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(400).json({ message: 'Could not update post with that ID'});
                return;
            }
            res.json(postData);
        })
        .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(400).json({ message: 'Could not find a post with that ID'});
                return;
            }
            res.json(postData)
        })
        .catch(err => res.status(500).json(err));
})

module.exports = router;
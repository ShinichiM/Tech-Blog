const { Post, User } = require('../../models');
const router = require('express').Router();
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username'] 
    })
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username'] 
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'Could not find user with that ID'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    User.update({
        username: req.body.username
    },
    {
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'Could not find user with that ID'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: "Username not found" });
                return;
            }
            const validPassword = userData.checkPassword(req.body.passowrd);

            if (!validPassword) {
                res.status(400).json({ message: "Incorrect password" });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id,
                req.session.username = userData.username,
                req.session.loggedIn = true;

                res.json({ user: userData, message: "You are now logged in" });
            });
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;
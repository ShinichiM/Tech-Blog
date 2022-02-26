const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const parseDateTime = require("../utilities/parseDateTime.js");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["title", "content", "createdAt", "id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["comment_text", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      // console.log(req.session);
      console.log(posts);
      const data = { posts: posts, loggedIn: req.session.loggedIn };
      console.log(data);

      res.render("homepage", {
        posts,
        session: {
          user_id: req.session.user_id,
          loggedIn: req.session.loggedIn,
          username: req.session.username,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbData) => {
      const posts = dbData.map((post) => post.get({ plain: true }));

      const session = {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
        username: req.session.username,
      };
      res.render("dashboard", { posts, session });
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/post', (req, res) => {
  const session = {
    user_id: req.session.user_id
  }
  res.render('post', { session });
})

module.exports = router;

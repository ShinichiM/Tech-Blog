const router = require("express").Router();
const { User, Post } = require("../models");
const parseDateTime = require('../utilities/parseDateTime.js');

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["title", "content", "createdAt"],
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

        console.log(String(posts[0].createdAt))
      console.log(
        "----------------------------------",
        posts,
        "----------------------------------"
      );
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
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

module.exports = router;

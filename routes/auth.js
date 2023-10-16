const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("Login");
})

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login");
    });
})

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}), (req, res) => {
    res.send("Login with google");
})

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.send(req.user);
})

module.exports = router;
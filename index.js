const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth.js");
require("./passport/passport.js");
const passport = require("passport");
const session = require("express-session");
const app = express();

mongoose.connect("mongodb://localhost:27017/users");

app.use(session({
    secret: "asdgauydiahjsdiuasg",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));


app.set("view engine", "ejs");
app.use("/auth", auth);

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    }
    next();
}

app.get("/", isLoggedIn, (req, res) => {
    res.render("Home");
})

app.listen(4000, () => {
    console.log("Server is running at port 4000...");
})
const passport = require("passport");
const User = require("../model/User.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: "798948910958-rpadc6pp25f5f26mttjsnooqglgv0flp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, next) => {
        console.log("hello3")
        console.log("MY PROFILE", profile._json.email);
        try {
            let user = await User.findOne({ email: profile._json.email });
            if (user) {
                console.log("User already exists in database", user);
                return next(null, user);
            } else {
                user = await User.create({
                    name: profile.displayName,
                    googleId: profile.id,
                    email: profile._json.email
                })
                return done(null, user);
            }
        } catch (error) {
            console.log(error.message);
            next(new Error(error.message));
        }
    }
)
)
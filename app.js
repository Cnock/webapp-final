var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user"),
    Post = require("./models/post");
 
mongoose.connect("mongodb://localhost/loginsys");
 
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
//=====================
// ROUTES
//=====================
 
// Showing home page
app.get("/", isNotLoggedIn, function (req, res) {
    res.render("home");
});
 
// Showing secret page
app.get("/posts", isLoggedIn, function (req, res) {
    res.render("posts");
});
 
// Showing register form
app.get("/register", isNotLoggedIn, function (req, res) {
    res.render("register");
});
 
// Handling user signup
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    User.register(new User({ username: username, email:email }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(
            req, res, function () {
            res.render("posts");
        });
    });
});
 
//Showing login form
app.get("/login", isNotLoggedIn, function (req, res) {
    res.render("login");
});
 
//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}), function (req, res) {
});
 
//Handling creating a new post
app.post("/newpost", function (req, res) {
    var username = req.user.username
    var content = req.body.content
    const npost = new Post({ username: username, content: content });
    npost.save()
    res.render("posts");
});

//Handling user logout
app.get("/logout", isLoggedIn, function (req, res) {
    req.logout();
    res.redirect("/");
});
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

function isNotLoggedIn(req, res, next) {
    if (!(req.isAuthenticated())) return next();
    res.redirect("/posts");
}
 
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-beata:mleczyk123@cluster0.yu0at.mongodb.net/blogPosts", {
  useNewUrlParser: true
});

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {

  Post.update();
  //res.sendFile(__dirname + "/views/home.ejs");
  //res.render("home")

Post.find({}, function(err, results) {

  res.render("home", {
    homeTxt: homeStartingContent,
    posts: results
  });
});
});

app.get('/posts/:postID', function(req, res) {

      let postID = req.params.postID;

console.log("id----" + postID);
Post.findOne({_id: postID}, function(err, results) {

if (results){

  res.render("post", {
    title: results.title,
    content: results.content
  });

}else{
  res.render("post", {
    title: "PAGE NOT FOUND",
    content: "PAGE NOT FOUND"
});
}
});


});


app.get("/about", function(req, res) {
  res.render("about", {
    aboutTxt: aboutContent,
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactTxt: contactContent,
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {});
});

app.post("/compose", function(req, res) {

  const post = new Post({
    "title": req.body.titleText,
    "content": req.body.postText
  });

  post.save();
  post.update();

  Post.find({}, function(err, results) {

    res.redirect("/");
  });

//res.render("home", {
//  homeTxt: homeStartingContent,
//    posts: Post
//});

})

let port = process.env.PORT;

if(!port) {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});

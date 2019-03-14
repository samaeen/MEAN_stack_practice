var express = require('express');
var port=3000;
var app=express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogtest');

var PostSchema=mongoose.Schema({
	title:{type:String,required:true},
	body:String,
	tag:{type:String,enum:['Technology','Economy','Education']},
	posted: {type:Date,default: Date.now}
},{collection:'post'});

var PostModel =mongoose.model("PostModel",PostSchema);

var bodyParser=require('body-parser');

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/blogpost",createPost);
app.get("/api/blogpost",getAllPosts);
app.get("/api/blogpost/:id",getPostById);
app.delete("/api/blogpost/:id",deletePost);
app.put("/api/blogpost/:id",updatePost);

function updatePost(req,res){
	var postId=req.params.id;
	var post=req.body;
	PostModel
			.update({_id:postId},{
				title:post.title,
				body:post.body
				})
			.then(
				function(status){
					res.sendStatus(200);
				},
				function(err){
					res.sendStatus(400);
				}
				);
}

function getPostById(req,res){
	var postId=req.params.id;
	PostModel
			.findById(postId)
			.then(
				function(post){
					res.json(post);
				},
				function(err){
					res.sendStatus(400);
				}
				);
}


function deletePost(req,res){
	var postId=req.params.id;
	PostModel
			.remove({_id:postId})
			.then(
				function(status){
					res.sendStatus(200);
				},
				function(){
					res.sendStatus(400);
				}
				);
}

function getAllPosts(req,res){
	PostModel
		.find()
		.then(
			function(posts){
				res.json(posts);
			},
			function(err){
				res.sendStatus(400);
			});
}

function createPost(req,res){
	var post=req.body;
	console.log(post);
	PostModel
		.create(post)
		.then(
			function(postObj){
				res.json(200);
			},
			function(error){
				res.sendStatus(400);
			});
}

app.listen(port,function(){
	console.log('server started on port ',+port);
});
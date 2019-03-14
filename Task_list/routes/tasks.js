var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs('mongodb://samaeen:s6022shoummo@ds155218.mlab.com:55218/mytasklist',['tasks']);

router.get('/tasks',function(req,res,next){
	db.tasks.find(function(err,tasks){
		if (err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

module.exports=router;
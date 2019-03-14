const express=require('express');
const router=express.Router();

//Register
router.get('/register',function(res,req,next){
	res.send('REGISTER');
});


//Authentication
router.post('/authenticate',function(res,req,next){
	res.send('AUTHENTICATE');
});

//Profile
router.get('/profile',function(req,res,next){
	res.send('PROFILE');
})

//Validate
router.get('/validate',function(req,res,next){
	res.send('VALIDATE');
})

module.exports=router;
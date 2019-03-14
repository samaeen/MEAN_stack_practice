const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');

mongoose.connect();

mongoose.connection.on('connected',function(){
	console.log('connected'+config.database);
});

const app =express();

const users=require('./routes/users');

const port=3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//body-parser middleware
app.use(bodyParser.json());

app.use('/users',users);

app.get('/',function(req,res){
	res.send('Invalid Endpoint');
})

app.listen(port,function(){
	console.log('server on '+port);
});
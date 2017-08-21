const express 		=		require('express');
const app 			=		express();
const port 			=		process.env.PORT || 8080;
const morgan    	=		require('morgan');
const mongoose		=		require('mongoose');
const bodyParser 	=		require('body-parser');
const router		=		express.Router();
const appRoutes		=		require('./app/routes/api')(router);
const path			=		require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use('/api',appRoutes);

mongoose.connect('mongodb://localhost:27017/MEAN',(err)=>{
	if(err){
		console.log(`Not connected to the database ${err}.`)
	}else{
		console.log('Successfully connected to MongoDB.')
	}
});

app.get('*', function(req, res){
		res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function(){
	console.log(`Running the server on port ${port}.`);
});

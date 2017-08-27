const User 		=	require('../models/user');
const jwt		=	require('jsonwebtoken');
const secret	=	'herrypotter';
module.exports  =   (router)=>{
/////////////////////		USER REGISTRATION ROUTE	////////////////////////////

	router.post('/users',(req, res) => {
		const user 		=		new User();
		user.username 	=		req.body.username;
		user.password 	=		req.body.password;
		user.email		=		req.body.email;
		if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
			res.json({ success: false, message: `Ensure username, email and password were provided.` });
		} else {
			user.save(function(err){
				if (err) {
					res.json({success: false, message: `Username or Email already exists!`});
				} else {
					res.json({success: true, message: 'User creadted.'});
				}
			});
		}
	});

/////////////////////		USER LOGIN ROUTE		//////////////////////////////////////

	router.post('/authenticate',(req ,res) => {
		User.findOne({username: req.body.username}).select('email username password').exec((err, user) => {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Could not authenticate user.'});
			} else if (user){
				if (req.body.password) {
					var validPassword	=	user.comparePassword(req.body.password);
				} else {
					res.json({success: false, message: 'No password provided.'})
				}
				if (!validPassword) {
					res.json({ success: false, message: 'Could not authenticate password.'});
				} else {
					let token = jwt.sign({username: user.username, email: user.email}, secret, { expiresIn: '24h' });
					res.json({success: true, message: 'User authenticated!', token: token});
				}
			}
		});
	});

/////////////////////		MIDDLEWARE		/////////////////////////////////////////////////

	router.use((req, res, next) => {
		let token	=	req.body.token || req.body.query || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, secret, (err, decoded) => {
				if (err){
					res.json({ success: false, message: 'Token invalid.' });
				} else {
					req.decoded	=	decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token provided.'})
		}
	});

////////////////////	//////////////////////////////////////
  
	router.post('/me',(req, res) => {
		res.send(req.decoded);
	});

return router;
}

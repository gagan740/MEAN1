const User 			=		require('../models/user');
module.exports  = (router)=>{
/////////////////////		USER REGISTRATION ROUTE	////////////////////////////

	router.post('/users',(req,res) => {
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

	router.post('/authenticate',(req,res) => {
		User.findOne({username: req.body.username}).select('email username password').exec((err, user) => {
			if(err) throw err;

			if(!user){
				res.json({ success: false, message: 'Could not authenticate user.'});
			}else if(user){
				if(req.body.password){
					var validPassword	=	user.comparePassword(req.body.password);
				}else{
					res.json({success: false, message: 'No password provided.'})
				}

				if(!validPassword){
					res.json({ success: false, message: 'Could not authenticate password.'});
				}else{
					res.json({success: true, message: 'User authenticated!'});
				}
			}
		});
	});
  return router;
}

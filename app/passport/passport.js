const FacebookStrategy  =   require('passport-facebook').Strategy;
const User              =   require('../models/user');
const session           =   require('express-session')

module.exports          =   (app, passport) => {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {secure: false} }));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: '1103841259749983',
        clientSecret: '3aceed56386ee03458bcd8877d85114d',
        callbackURL: "http://localhost:8080",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        console.log(profile);
        done(null, profile);
      }
    ));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' })
    );
    app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
    );

    return passport;
}
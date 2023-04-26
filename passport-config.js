const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy


function initialize(passport, getUserByUserName){
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUserName(username)
        if(user == null){
            return done(null, false, {message: 'No username'})
        }
        const check = await LogIn.findOne({username: username})

        try{
            if(check.password === user.password){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect password'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'},
    authenticateUser))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})


}

module.export = initialize
const express = require('express');
const connectDB = require('./config/db');
const passportSteup = require("./config/passport-setup")
const passport = require('passport')
const bodyParser = require("body-parser")

const app = express()

//connect DB
connectDB();


// init moddleware 

app.use(express.json({extended: false}))

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


app.get('/', (req, res) => res.send('API RUNNING'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile')) 
app.use('/api/listing', require('./routes/api/listing'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
}) 
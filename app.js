const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const globals = require('./config/globals');
const blogRoutes = require('./routes/blogRoutes');
const BlogPost = require('./models/blogPost');
const indexRouter = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./documentation/swagger.yaml');

console.log(swaggerDocument);

const app = express();

// Middleware to parse JSON
app.use(express.json());


// Basic Authentication Strategy
passport.use(new BasicStrategy((username, password, done) => {
    const validUsername = globals.credentials.username;
    const validPassword = globals.credentials.password;

    if (username === validUsername && password === validPassword) {
        console.log('Authentication successful');
        return done(null, username); // Authentication passed
    } else {
        console.log('Authentication failed');
        return done(null, false); // Authentication failed
    }
}));

app.use('/',indexRouter);

app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Initialize Passport
app.use(passport.initialize());

// Protect routes with Basic Authentication
app.use(
    '/api/posts',
    passport.authenticate('basic', { session: false }),
    blogRoutes
);

// MongoDB Connection
mongoose.connect(globals.connectionStrings.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));



module.exports = app;
// Server vars
const express = require('express');
const path = require('path');
const port = 3000 || process.env.PORT;
const app = express();
const router = require('./routes/router.js');

// Template engine vars
const hbExport = require('express-handlebars');
const hb = hbExport.create({
    'extname': '.hbs',
    'defaultLayout': 'index'
});

// Database



// Middlewares & Engines
app.use('/content', express.static(path.join(__dirname, 'content')));
app.use(router);
app.engine('.hbs', hb.engine);
app.set('view engine', '.hbs');

// Server start
app.listen(port, () => {
    console.log('Listening on port 3000');
});
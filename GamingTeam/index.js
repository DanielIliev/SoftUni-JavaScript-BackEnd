const express = require('express');
const router = require('./routes/routes.js');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authentication } = require('./middlewares/authenticationMiddleware.js');

// TODO: Change DB name based on exam name
mongoose.set('strictQuery', false); // For older versions
mongoose.connect('mongodb://localhost:27017/gamingteam');

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(router);

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});

// https://softuni.bg/trainings/resources/video/79985/video-08-february-2023-ivaylo-papazov-js-back-end-january-2023/3972
// - 01:40:00
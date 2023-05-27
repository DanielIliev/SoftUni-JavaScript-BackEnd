const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const Cat = require('../database/catSchema.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cats').then(() => {
    console.log('Connected');
}).catch((error) => {
    console.log(error);
});

router.get('/', async (req, res) => {
    try {
        const data = await Cat.find().lean();
        res.render('home', { data });
    } catch (error) {
        console.log(error);
    }
});

router.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
}).post('/cats/add-cat', (req, res, next) => {
    const uploadFolder = path.join(__dirname, '../content/images/');
    const form = formidable({
        multiples: false,
        maxFileSize: 50 * 1024 * 1024,
    });

    // Parsing
    form.parse(req, async (error, fields, files) => {
        if (error) {
            console.log("Error parsing the files");
            return res.status(400).json({
                status: "Fail",
                message: "There was an error parsing the files",
                error,
            });
        }

        // TODO: Error check for jpeg and png only
        const tempPath = files.upload.filepath;
        const fileExtension = '.' + files.upload['mimetype'].split('/')[1];
        const saveToPath = uploadFolder + files.upload.newFilename + fileExtension;
        const relativePath = '/content/images/' + files.upload.newFilename + fileExtension;
        const rawData = fs.readFileSync(tempPath);

        fs.writeFile(saveToPath, rawData, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('File uploaded');
            };
        });

        const entry = new Cat({
            name: fields.name,
            description: fields.description,
            breed: fields.breed,
            photoUrl: relativePath
        });

        try {
            await entry.save();
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }

    });
});

router.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

router.get('/cats/shelter', (req, res) => {
    res.render('catShelter');
});

router.get('/cats/edit-cat', (req, res) => {
    res.render('editCat');
});

module.exports = router;
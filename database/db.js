const Cat = require('../database/catSchema.js');
const mongoose = require('mongoose');

async function getCats() {
    try {
        const data = await Cat.find().lean();
        return data;
    } catch (error) {
        return error;
    }
}

async function addCat(catInfo) {
    const entry = new Cat({
        name: catInfo.name,
        description: catInfo.description,
        breed: catInfo.breed,
        photoUrl: catInfo.photoUrl
    });

    try {
        await entry.save();
    } catch (error) {
        return error;
    }
}

module.exports = {
    getCats,
    addCat
}
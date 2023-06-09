const Ad = require('../models/Ad.js');
const User = require('../models/User.js');

exports.getAdById = async (id) => {
    return await Ad.findOne({'_id': id}).lean();
}

exports.getUserByEmail = async(email) => {
    return await User.findOne({email}).lean();
}

exports.getAllAds = async () => {
    return await Ad.find({}).lean();
}

exports.applyForAd = async(adId, userId) => {
    await Ad.findOneAndUpdate({'_id': adId}, {
        $push: {
            usersApplied: userId
        }
    });
}

exports.deleteAd = async(id) => {
    await Ad.findOneAndDelete({'_id': id});

    return 'Ok';
}

exports.searchAds = async(authorEmail) => {
    if (!authorEmail) {
        throw new Error('All fields are required');
    }

    const emailPattern = new RegExp(/^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+/, 'gi');

    if (!authorEmail.match(emailPattern)) {
        throw new Error('Search value must follow abc@abc.abc format');
    }

    const authorData = await this.getUserByEmail(authorEmail);

    if (!authorData) {
        return [];
    }

    return await Ad.find({'author': authorData._id}).lean();
}

exports.editAd = async (id, headline, location, companyName, companyDescription) => {
    if (!headline || !location || !companyName || !companyDescription) {
        throw new Error('All fields are required');
    }

    if (headline.length < 4) {
        throw new Error('Headline must be at least 4 characters long');
    }
    
    if (location.length < 8) {
        throw new Error('Location must be at least 8 characters long');
    }

    if (companyName.length < 3) {
        throw new Error('The company name must be at least 3 characters long');
    }

    if (companyDescription.length > 40) {
        throw new Error('The company description must be 40 characters max');
    }

    await Ad.findOneAndUpdate({'_id': id}, {
        headline, location, companyName, companyDescription
    });
}

exports.createAd = async (headline, location, companyName, companyDescription, ownerId) => {
    if (!headline || !location || !companyName || !companyDescription) {
        throw new Error('All fields are required');
    }

    if (headline.length < 4) {
        throw new Error('Headline must be at least 4 characters long');
    }
    
    if (location.length < 8) {
        throw new Error('Location must be at least 8 characters long');
    }

    if (companyName.length < 3) {
        throw new Error('The company name must be at least 3 characters long');
    }

    if (companyDescription.length > 40) {
        throw new Error('The company description must be 40 characters max');
    }

    await Ad.create({headline, location, companyName, companyDescription, author: ownerId});
}
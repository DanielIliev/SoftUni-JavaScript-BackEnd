const Game = require("../models/Game.js");

exports.create = async (platform, name, image, price, genre, description, owner) => {
    const platforms = {
        'PC': 'PC',
        'Nintendo': 'Nintendo',
        'PS4': 'PS4',
        'PS5': 'PS5',
        'XBOX': 'XBOX',
    }

    if (!platform || !name || !image || !price || !genre || !description) {
        throw new Error('All fields are required');
    }

    if (!platforms[platform]) {
        throw new Error('Invalid platform');
    }

    if (name.length < 4) {
        throw new Error('Name must be at least 4 characters');
    }

    const imageUrlPattern = new RegExp(/^(http|https):\/\//, 'gi');

    if (image.match(imageUrlPattern) == null) {
        throw new Error('Image must start with http:// or https://');
    }

    if (Number(price) <= 0) {
        throw new Error('Price must be a positive number');
    }

    if (genre < 2) {
        throw new Error('Genre must be at least 2 characters');
    }

    if (description < 10) {
        throw new Error('Description must be at least 10 characters');
    }

    Game.create({ platform, name, image, price, genre, description, owner });
}

exports.edit = async (id, platform, name, image, price, genre, description) => {
    const platforms = {
        'PC': 'PC',
        'Nintendo': 'Nintendo',
        'PS4': 'PS4',
        'PS5': 'PS5',
        'XBOX': 'XBOX',
    }

    if (!platform || !name || !image || !price || !genre || !description) {
        throw new Error('All fields are required');
    }

    if (!platforms[platform]) {
        throw new Error('Invalid platform');
    }

    if (name.length < 4) {
        throw new Error('Name must be at least 4 characters');
    }

    const imageUrlPattern = new RegExp(/^(http|https):\/\//, 'gi');

    if (image.match(imageUrlPattern) == null) {
        throw new Error('Image must start with http:// or https://');
    }

    if (Number(price) <= 0) {
        throw new Error('Price must be a positive number');
    }

    if (genre < 2) {
        throw new Error('Genre must be at least 2 characters');
    }

    if (description < 10) {
        throw new Error('Description must be at least 10 characters');
    }

    return await Game.findOneAndUpdate({ '_id': id }, { platform, name, image, price, genre, description });
}

exports.getAllGames = async () => {
    const games = await Game.find().lean();

    return games;
}

exports.getOneGame = async (id) => {
    const game = await Game.findById(id).lean();

    return game;
}

exports.buyGame = async (gameId, buyerId) => {
    const game = await this.getOneGame(gameId);

    try {
        await Game.findOneAndUpdate({ '_id': gameId }, {
            '$push': { 'boughtBy': buyerId }
        });

        return 'Ok';
    } catch (error) {
        return error.message;
    }
}

exports.getGamesByCriteria = async (gameName, gamePlatform) => {
    if (gameName) {
        gameName = gameName.toLowerCase();
    }

    if (!gameName && !gamePlatform) {
        return await Game.find().lean();
    }

    if (gameName && !gamePlatform) {
        return await Game.find({'name': gameName}).lean();
    }

    if (!gameName && gamePlatform) {
        return await Game.find({'platform': gamePlatform}).lean();
    }

    if (gameName && gamePlatform) {
        return await Game.find({'name': gameName, 'platform': gamePlatform}).lean();
    }
}

exports.deleteGame = async (id) => {
    await Game.deleteOne({ '_id': id });
}
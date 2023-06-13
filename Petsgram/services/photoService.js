const Photo = require('../models/Photo.js');
const authService = require('../services/authService.js');

exports.getPhotoById = async (id) => await Photo.findOne({ '_id': id }).lean();

exports.getAuthorPhotos = async (id) => await Photo.find({ 'owner': id }).lean();

exports.getAllPhotos = async () => {
    const photos = await Photo.find().lean();

    if (photos.length !== 0) {
        for (const photo of photos) {
            const ownerData = await authService.getUserById(photo.owner.toString());
            photo.ownerName = ownerData.username;
        }

        return photos;
    }

    return [];
}

exports.create = async (data) => await Photo.create({
    name: data.name,
    image: data.image,
    age: data.age,
    description: data.description,
    location: data.location,
    owner: data.owner,
});

exports.addComment = async (photoId, commentatorId, comment) => await Photo.findOneAndUpdate(
    { '_id': photoId }, {
    $push: {
        commentList: {
            'userId': commentatorId,
            'comment': comment
        }
    },
});

exports.editPhoto = async (id, data) => await Photo.findOneAndUpdate(
    { '_id': id },
    {
        name: data.name,
        image: data.image,
        age: data.age,
        description: data.description,
        location: data.location
    },
    {
        runValidators: true,
    }
);

exports.deletePhoto = async (id) => await Photo.findByIdAndDelete({ '_id': id });
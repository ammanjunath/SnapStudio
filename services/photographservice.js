const Photograph = require('../model/Photograph');
const Exhibition = require('../model/exhibition');
// const addPhoto = async (photoDetails) => {
//     const { photoId,capturedLocation, photographer, viewerComments, photoType, rating } = photoDetails;
//     const newPhoto = new Photograph({
//         photoId,
//         capturedLocation,
//         photographer,
//         viewerComments,
//         photoType,
//         rating
//     });
//     return newPhoto.save();
// };
const addPhoto = async (exhibitionId, photographData) => {
    // const photograph = new Photograph({
    //     ...photographData,
    //     exhibitionId: exhibitionId // Assuming that the photograph schema includes an exhibitionId field.
    // });
    // return await photograph.save();

    const exhibition = await Exhibition.findOne({exhibitionId});
    if (!exhibition) {
      throw new createError.NotFound('Invalid Exhibition ID');
    }
console.log("SSSSSSSSSSS",exhibition)
    // Create the Photograph and set the exhibition reference
    const photograph = new Photograph({
      ...photographData,
      exhibitionObj: exhibition._id // Set the exhibition object ID
    });
    console.log("savedPhotograph111111110",photograph)
    // Save the Photograph to the database
    const savedPhotograph = await photograph.save();
console.log("savedPhotograph1111111111",savedPhotograph)
exhibition.photographs.push(savedPhotograph._id);
    await exhibition.save();
    // Return the saved Photograph
    return savedPhotograph;
};
const appendViewerComments = async (photoId, viewerComments) => {
    const photo = await Photograph.findOne({ photoId });
    if (photo) {
        photo.viewerComments = (photo.viewerComments || '') + ' ' + viewerComments;
        return photo.save();
    } else {
        throw new Error('Photograph not found');
    }
};

const viewPhotosByPhotographer = (photographer) => {
    return Photograph.find({ photographer });
};

const viewPhotoById = (photoId) => {
    return Photograph.findOne({ photoId });
};

const viewPhotosByRating = (startRating, endRating) => {
    return Photograph.find({ rating: { $gte: startRating, $lte: endRating } });
};

const removePhoto = (photoId) => {
    return Photograph.findOneAndDelete({ photoId });
};
async function viewPhotographsByExhibitionTheme(theme) {
    try {
        // Find the exhibition by theme and populate the photographList field
        const exhibition = await Exhibition.findOne({ theme }).populate('photographs');
        if (!exhibition) {
            throw new Error('Exhibition not found');
        }
        // Return the populated photograph data
        return exhibition.photographs;
    } catch (error) {
        throw error;
    }
}

async function viewPhotographsByExhibitionLocation(location) {
    try {
        // Find the exhibition by location and populate the photographList field
        const exhibition = await Exhibition.findOne({ location }).populate('photographs');
        if (!exhibition) {
            throw new Error('Exhibition not found');
        }
        // Return the populated photograph data
        return exhibition.photographs;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addPhoto,
    appendViewerComments,
    viewPhotosByPhotographer,
    viewPhotoById,
    viewPhotosByRating,
    removePhoto,
    viewPhotographsByExhibitionTheme,
    viewPhotographsByExhibitionLocation
};

// class PhotographService {
//     async addPhoto(photoDetails) {
//         const { capturedLocation,  photographer, viewerComments,photoType,rating } = photoDetails;
//         const newPhoto = new Photograph({
//             photoId: await Photograph.countDocuments() + 1,
//             capturedLocation,
//             photographer,
//             viewerComments,
//             photoType,
//             rating

//         });
//         return newPhoto.save();
//     }

//     async appendViewerComments(photoId, viewerComments) {
//         const photo = await Photograph.findOne({ photoId });
//         if (photo) {
//             photo.viewerComments = (photo.viewerComments || '') + ' ' + viewerComments;
//             return photo.save();
//         } else {
//             throw new Error('Photograph not found');
//         }
//     }

//     viewPhotosByPhotographer(photographer) {
//         return Photograph.find({ photographer: photographer });
//     }

//     viewPhotoById(photoId) {
//         return Photograph.findOne({ photoId });
//     }

//     viewPhotosByRating(startRating, endRating) {
//         return Photograph.find({ rating: { $gte: startRating, $lte: endRating } });
//     }

//     removePhoto(photoId) {
//         return Photograph.findOneAndDelete({ photoId });
//     }
// }

// module.exports = new PhotographService();




// const photographs = [];

// class PhotographService {
//     addPhoto(photoDetails) {
//         const newPhoto = { id: photographs.length + 1, ...photoDetails };
//         photographs.push(newPhoto);
//         return Promise.resolve(newPhoto);
//     }

//     appendViewerComments(photoId, viewerComments) {
//         const photo = photographs.find(p => p.id === parseInt(photoId));
//         if (photo) {
//             photo.viewerComments = (photo.viewerComments || '') + ' ' + viewerComments;
//             return Promise.resolve(photo);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }

//     viewPhotosByPhotographer(photographer) {
//         const result = photographs.filter(p => p.photographer === photographer);
//         return Promise.resolve(result);
//     }

//     viewPhotoById(photoId) {
//         const photo = photographs.find(p => p.id === parseInt(photoId));
//         if (photo) {
//             return Promise.resolve(photo);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }

//     viewPhotosByRating(startRating, endRating) {
//         const result = photographs.filter(p => p.rating >= startRating && p.rating <= endRating);
//         return Promise.resolve(result);
//     }

//     removePhoto(photoId) {
//         const index = photographs.findIndex(p => p.id === parseInt(photoId));
//         if (index !== -1) {
//             const removedPhoto = photographs.splice(index, 1);
//             return Promise.resolve(removedPhoto[0]);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }
// }

// module.exports = new PhotographService();


// const photographs = [];

// class PhotographService {
//     addPhoto(photoDetails) {
//         const newPhoto = { id: photographs.length + 1, ...photoDetails };
//         photographs.push(newPhoto);
//         return Promise.resolve(newPhoto);
//     }

//     appendViewerComments(photoId, viewerComments) {
//         const photo = photographs.find(p => p.id === parseInt(photoId));
//         if (photo) {
//             photo.viewerComments = (photo.viewerComments || '') + ' ' + viewerComments;
//             return Promise.resolve(photo);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }

//     viewPhotosByPhotographer(photographer) {
//         const result = photographs.filter(p => p.photographer === photographer);
//         return Promise.resolve(result);
//     }

//     viewPhotoById(photoId) {
//         const photo = photographs.find(p => p.id === parseInt(photoId));
//         if (photo) {
//             return Promise.resolve(photo);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }

//     viewPhotosByRating(startRating, endRating) {
//         const result = photographs.filter(p => p.rating >= startRating && p.rating <= endRating);
//         return Promise.resolve(result);
//     }

//     removePhoto(photoId) {
//         const index = photographs.findIndex(p => p.id === parseInt(photoId));
//         if (index !== -1) {
//             const removedPhoto = photographs.splice(index, 1);
//             return Promise.resolve(removedPhoto[0]);
//         } else {
//             return Promise.reject(new Error('Photograph not found'));
//         }
//     }
// }

// module.exports = new PhotographService();

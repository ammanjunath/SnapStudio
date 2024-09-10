const Exhibition = require('../model/exhibition');
const Photograph = require('../model/Photograph');
exports.createExhibition = async (exhibitionData) => {
  const exhibition = new Exhibition(exhibitionData);
  return await exhibition.save();
};

exports.getExhibitionById = async (exhibitionId) => {
  // return await Exhibition.findById(exhibitionId);
  return await Exhibition.findOne({ exhibitionId });
};

exports.getExhibitionsByLocationAndTheme = async (location, theme) => {
  return await Exhibition.find({ location, theme });
};

exports.updateExhibitionDuration = async (exhibitionId, duration) => {
  return await Exhibition.findOneAndUpdate({exhibitionId}, { duration }, { new: true });
};

exports.updateExhibitionStatus = async (exhibitionId, status) => {
  return await Exhibition.findOneAndUpdate({exhibitionId}, { status }, { new: true });
};

// exports.viewExhibitionsByPhotographer = async (photographer) => {
//   try {
//     // Find photographs by the given photographer
//     const photographs = await Photograph.find({ photographer });

//     // Extract the exhibitionObj (which is the exhibitionId) from each photograph
//     const exhibitionIds = photographs.map(photo => photo.exhibitionObj);

//     console.log("Exhibition IDs:", exhibitionIds);

//     // Find all exhibitions with the corresponding exhibitionIds
//     return await Exhibition.find({ _id: { $in: exhibitionIds } });
//   } catch (error) {
//     throw new Error('Error finding exhibitions by photographer: ' + error.message);
//   }
// };

exports.viewExhibitionsByPhotographer = async (photographer) => {
  try {
    // Find photographs by the given photographer
    const photographs = await Photograph.find({ photographer });

    // Extract the exhibitionObj (which is the exhibitionId) from each photograph
    const exhibitionIds = photographs.map(photo => photo.exhibitionObj);

    // Find all exhibitions with the corresponding exhibitionIds
    const exhibitions = await Exhibition.find({ _id: { $in: exhibitionIds } })
      .populate('photographs'); // Populate the photographs array with actual photograph documents

    return exhibitions;
  } catch (error) {
    throw new Error('Error finding exhibitions by photographer: ' + error.message);
  }
};


exports.viewExhibitionsByPhotoRating = async (rating) => {
  try {
    // Find photographs with the given rating
    const photographs = await Photograph.find({ rating });

    // Extract the exhibitionObj (which is the exhibitionId) from each photograph
    const exhibitionIds = photographs.map(photo => photo.exhibitionObj);

    // Find all exhibitions with the corresponding exhibitionIds
    return await Exhibition.find({ _id: { $in: exhibitionIds } });
  } catch (error) {
    throw new Error('Error finding exhibitions by photo rating: ' + error.message);
  }
};
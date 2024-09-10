const express = require('express');
const router = express.Router();
const photographService = require('../services/photographService');

// Add Photograph
// router.post('/addPhoto', async (req, res) => {
//     try {
//         console.log("GGGGGGGGGGGGGGGGGGGG",req.body)
//         const photo = await photographService.addPhoto(req.body);
//         res.status(201).json(photo);
//     } catch (error) {
//         console.log("here",error)
//         res.status(500).json({ error: error.message });
//     }
// });
router.post('/addPhoto/:exhibitionId', async (req, res) => {
    try {
        const exhibitionId = req.params.exhibitionId;
        const photographData = req.body;

        const photograph = await photographService.addPhoto(exhibitionId, photographData);
        res.status(201).json(photograph);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Append Viewer Comments
router.put('/appendViewerComments/:photoId/:viewerComments', async (req, res) => {
    try {
        const { photoId, viewerComments } = req.params;
        const updatedPhoto = await photographService.appendViewerComments(photoId, viewerComments);
        res.status(200).json(updatedPhoto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Photos by Photographer
router.get('/viewPhotosByPhotographer/:photographer', async (req, res) => {
    try {
        console.log("req.params.photographer",req.params.photographer);
        const photos = await photographService.viewPhotosByPhotographer(req.params.photographer);
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Photo by ID
router.get('/viewPhotoById/:photoId', async (req, res) => {
    try {
        const photo = await photographService.viewPhotoById(req.params.photoId);
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Photos by Rating
router.get('/viewPhotosByRating/:startRating/:endRating', async (req, res) => {
    try {
        const { startRating, endRating } = req.params;
        console.log("DFsdf",startRating, endRating)
        const photos = await photographService.viewPhotosByRating(startRating, endRating);
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove Photo
router.delete('/removePhoto/:photoId', async (req, res) => {
    try {
        const photo = await photographService.removePhoto(req.params.photoId);
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/viewPhotographsByExhibitionTheme/:theme', async (req, res) => {
    try {
        const photographs = await photographService.viewPhotographsByExhibitionTheme(req.params.theme);
        res.status(200).json(photographs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve photographs by exhibition location
router.get('/viewPhotographsByExhibitionLocation/:location', async (req, res) => {
    try {
        const photographs = await photographService.viewPhotographsByExhibitionLocation(req.params.location);
        res.status(200).json(photographs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

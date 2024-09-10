const express = require('express');
const exhibitionService = require('../services/exhibitionService');
const router = express.Router();

// Create a new exhibition
router.post('/createExhibition', async (req, res) => {
    try {

        console.log('Request Body:', req.body); 
        const exhibition = await exhibitionService.createExhibition(req.body);
        res.status(201).json(exhibition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View an exhibition by ID
router.get('/viewExhibitionById/:exhibitionId', async (req, res) => {
    try {
        const exhibition = await exhibitionService.getExhibitionById(req.params.exhibitionId);
        if (exhibition) {
            res.status(200).json(exhibition);
        } else {
            res.status(404).json({ message: 'Exhibition not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View exhibitions by location and theme
router.get('/viewExhibitionsByLocationAndTheme/:location/:theme', async (req, res) => {
    try {
        const exhibitions = await exhibitionService.getExhibitionsByLocationAndTheme(req.params.location, req.params.theme);
        res.status(200).json(exhibitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update the duration of an exhibition
router.put('/updateDuration/:exhibitionId/:duration', async (req, res) => {
    try {
        const updatedExhibition = await exhibitionService.updateExhibitionDuration(req.params.exhibitionId, req.params.duration);
        res.status(200).json(updatedExhibition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update the status of an exhibition
router.put('/updateStatus/:exhibitionId/:status', async (req, res) => {
    try {
        const updatedExhibition = await exhibitionService.updateExhibitionStatus(req.params.exhibitionId, req.params.status);
        res.status(200).json(updatedExhibition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Retrieve exhibitions by photographer
router.get('/viewExhibitionsByPhotographer/:photographer', async (req, res) => {
    try {
        const exhibitions = await exhibitionService.viewExhibitionsByPhotographer(req.params.photographer);
        res.status(200).json(exhibitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve exhibitions by photo rating
router.get('/viewExhibitionsByPhotoRating/:rating', async (req, res) => {
    try {
        const exhibitions = await exhibitionService.viewExhibitionsByPhotoRating(req.params.rating);
        res.status(200).json(exhibitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

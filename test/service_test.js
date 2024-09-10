const request = require('supertest');
const expect = require('chai').expect;
const app = require('./app'); // Path to your main Express app
// const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Exhibition = require('../model/exhibition');
const Photograph = require('../model/Photograph');
const exhibitionService = require('../services/exhibitionService');
const photographService = require('../services/photographService');

describe('Exhibition Routes', () => {
    
    it('should create a new exhibition', async () => {
        const newExhibition = {
            exhibitionId: '123',
            exhibitionTitle: 'Art Expo',
            theme: 'Modern Art',
            duration: 30,
            location: 'New York',
            status: 'Scheduled'
        };

        const response = await request(app)
            .post('/exhibition/createExhibition')
            .send(newExhibition);
        
        expect(response.status).to.equal(201);
        expect(response.body).to.include(newExhibition);
    });

    it('should retrieve an exhibition by ID', async () => {
        const exhibitionId = '123';

        const response = await request(app)
            .get(`/exhibition/viewExhibitionById/${exhibitionId}`);
        
        expect(response.status).to.equal(200);
        expect(response.body.exhibitionId).to.equal(exhibitionId);
    });

    it('should retrieve exhibitions by location and theme', async () => {
        const location = 'New York';
        const theme = 'Modern Art';

        const response = await request(app)
            .get(`/exhibition/viewExhibitionsByLocationAndTheme/${location}/${theme}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('location', location);
        expect(response.body[0]).to.have.property('theme', theme);
    });

    it('should update the duration of an exhibition', async () => {
        const exhibitionId = '123';
        const newDuration = 45;

        const response = await request(app)
            .put(`/exhibition/updateDuration/${exhibitionId}/${newDuration}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('duration', newDuration);
    });

    it('should update the status of an exhibition', async () => {
        const exhibitionId = '123';
        const newStatus = 'Completed';

        const response = await request(app)
            .put(`/exhibition/updateStatus/${exhibitionId}/${newStatus}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', newStatus);
    });

    // Uncomment and complete these test cases when corresponding routes are implemented.
    /*
    it('should retrieve exhibitions by photographer', async () => {
        const photographer = 'John Doe';

        const response = await request(app)
            .get(`/viewExhibitionsByPhotographer/${photographer}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should retrieve exhibitions by photo rating', async () => {
        const rating = 5;

        const response = await request(app)
            .get(`/viewExhibitionsByPhotoRating/${rating}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
    */
});

describe('Photograph Routes', () => {

    // Test for adding a photograph
    it('should add a new photograph', async () => {
        const newPhoto = {
            photoId:1101,
            capturedLocation:'Himalayas',
            photoType: 'Sunset',
            photographer: 'John Doe',
            rating: 5,
            viewerComments: 'Beautiful Pic'
        };

        const response = await request(app)
            .post('/photograph/addPhoto')
            .send(newPhoto);
        
        expect(response.status).to.equal(201);
        expect(response.body).to.include(newPhoto);
    });

    // Test for appending viewer comments
    it('should append viewer comments to a photograph', async () => {
        const photoId = 1101;
        const viewerComments = 'Amazing photo!';

        const response = await request(app)
            .put(`/photograph/appendViewerComments/${photoId}/${viewerComments}`);
        
        expect(response.status).to.equal(200);
        expect(response.body.viewerComments).to.include(viewerComments);
    });

    // Test for viewing photos by photographer
    it('should retrieve photos by photographer', async () => {
        const photographer = 'John Doe';

        const response = await request(app)
            .get(`/photograph/viewPhotosByPhotographer/${photographer}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('photographer', photographer);
    });

    // Test for viewing a photo by ID
    it('should retrieve a photo by ID', async () => {
        const photoId = 1101;

        const response = await request(app)
            .get(`/photograph/viewPhotoById/${photoId}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('photoId', photoId);
    });

    // Test for viewing photos by rating range
    it('should retrieve photos by rating range', async () => {
        const startRating = 4;
        const endRating = 5;

        const response = await request(app)
            .get(`/photograph/viewPhotosByRating/${startRating}/${endRating}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('rating').within(startRating, endRating);
    });

    // Test for removing a photograph
    it('should remove a photograph', async () => {
        const photoId = 1101;

        const response = await request(app)
            .delete(`/photograph/removePhoto/${photoId}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('photoId', photoId);
    });
    
     it('should return 500 for invalid photograph data', async () => {
            const invalidPhoto = {}; // Sending an empty object as invalid data

            const response = await request(app)
                .post('/photograph/addPhoto')
                .send(invalidPhoto);
            
            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('error');
        });
    it('should return 500 for invalid photoId', async () => {
            const invalidPhotoId = 'invalid-id';
            const viewerComments = 'Nice shot!';

            const response = await request(app)
                .put(`/photograph/appendViewerComments/${invalidPhotoId}/${viewerComments}`);
            
            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('error');
        });
            
     it('should return 500 for a non-existent photographer', async () => {
            const nonExistentPhotographer = 'Unknown Photographer';

            const response = await request(app)
                .get(`/photograph/viewPhotosByPhotographer/${nonExistentPhotographer}`);
            
            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('error');
        });
});


describe('Exhibition Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new exhibition', async () => {
    const exhibitionData = {
      exhibitionId: '123',
      exhibitionTitle: 'Art Expo',
      theme: 'Modern Art',
      duration: 30,
      location: 'New York',
      status: 'Scheduled'
    };

    const saveStub = sinon.stub(Exhibition.prototype, 'save').resolves(exhibitionData);
    const result = await exhibitionService.createExhibition(exhibitionData);

    expect(saveStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(exhibitionData);
  });

  it('should retrieve an exhibition by ID', async () => {
    const exhibitionId = '123';
    const exhibitionData = { exhibitionId };

    const findOneStub = sinon.stub(Exhibition, 'findOne').resolves(exhibitionData);
    const result = await exhibitionService.getExhibitionById(exhibitionId);

    expect(findOneStub.calledOnceWith({ exhibitionId })).to.be.true;
    expect(result).to.deep.equal(exhibitionData);
  });

  it('should retrieve exhibitions by location and theme', async () => {
    const location = 'New York';
    const theme = 'Modern Art';
    const exhibitionsData = [{ location, theme }];

    const findStub = sinon.stub(Exhibition, 'find').resolves(exhibitionsData);
    const result = await exhibitionService.getExhibitionsByLocationAndTheme(location, theme);

    expect(findStub.calledOnceWith({ location, theme })).to.be.true;
    expect(result).to.deep.equal(exhibitionsData);
  });

  it('should update the duration of an exhibition', async () => {
    const exhibitionId = '123';
    const newDuration = 45;
    const updatedExhibition = { exhibitionId, duration: newDuration };

    const findByIdAndUpdateStub = sinon.stub(Exhibition, 'findByIdAndUpdate').resolves(updatedExhibition);
    const result = await exhibitionService.updateDuration(exhibitionId, newDuration);

    expect(findByIdAndUpdateStub.calledOnceWith(exhibitionId, { duration: newDuration }, { new: true })).to.be.true;
    expect(result).to.deep.equal(updatedExhibition);
  });

  it('should update the status of an exhibition', async () => {
    const exhibitionId = '123';
    const newStatus = 'Completed';
    const updatedExhibition = { exhibitionId, status: newStatus };

    const findByIdAndUpdateStub = sinon.stub(Exhibition, 'findByIdAndUpdate').resolves(updatedExhibition);
    const result = await exhibitionService.updateStatus(exhibitionId, newStatus);

    expect(findByIdAndUpdateStub.calledOnceWith(exhibitionId, { status: newStatus }, { new: true })).to.be.true;
    expect(result).to.deep.equal(updatedExhibition);
  });

  it('should retrieve exhibitions by photographer', async () => {
    const photographer = 'John Doe';
    const photographsData = [{ exhibitionId: '123' }, { exhibitionId: '456' }];
    const exhibitionsData = [{ exhibitionId: '123' }, { exhibitionId: '456' }];

    const findPhotographsStub = sinon.stub(Photograph, 'find').resolves(photographsData);
    const findExhibitionsStub = sinon.stub(Exhibition, 'find').resolves(exhibitionsData);

    const result = await exhibitionService.viewExhibitionsByPhotographer(photographer);

    expect(findPhotographsStub.calledOnceWith({ photographer })).to.be.true;
    expect(findExhibitionsStub.calledOnceWith({ exhibitionId: { $in: ['123', '456'] } })).to.be.true;
    expect(result).to.deep.equal(exhibitionsData);
  });

  it('should retrieve exhibitions by photo rating', async () => {
    const rating = 5;
    const photographsData = [{ exhibitionId: '123' }, { exhibitionId: '456' }];
    const exhibitionsData = [{ exhibitionId: '123' }, { exhibitionId: '456' }];

    const findPhotographsStub = sinon.stub(Photograph, 'find').resolves(photographsData);
    const findExhibitionsStub = sinon.stub(Exhibition, 'find').resolves(exhibitionsData);

    const result = await exhibitionService.viewExhibitionsByPhotoRating(rating);

    expect(findPhotographsStub.calledOnceWith({ rating })).to.be.true;
    expect(findExhibitionsStub.calledOnceWith({ exhibitionId: { $in: ['123', '456'] } })).to.be.true;
    expect(result).to.deep.equal(exhibitionsData);
  });

  it('should return null if exhibition ID is not found during duration update', async () => {
    const exhibitionId = 'invalidId';
    const newDuration = 45;

    const findByIdAndUpdateStub = sinon.stub(Exhibition, 'findByIdAndUpdate').resolves(null);
    const result = await exhibitionService.updateDuration(exhibitionId, newDuration);

    expect(findByIdAndUpdateStub.calledOnceWith(exhibitionId, { duration: newDuration }, { new: true })).to.be.true;
    expect(result).to.be.null;
  });

  it('should return null if exhibition ID is not found during status update', async () => {
    const exhibitionId = 'invalidId';
    const newStatus = 'Completed';

    const findByIdAndUpdateStub = sinon.stub(Exhibition, 'findByIdAndUpdate').resolves(null);
    const result = await exhibitionService.updateStatus(exhibitionId, newStatus);

    expect(findByIdAndUpdateStub.calledOnceWith(exhibitionId, { status: newStatus }, { new: true })).to.be.true;
    expect(result).to.be.null;
  });
});



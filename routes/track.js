const express = require('express');

const trackController = require('../controllers/track-controller');

const router = new express.Router();

router
  .get('/', trackController.getTracks)
  .post('/', trackController.addTrack)
  .delete('/:id', trackController.deleteTrack)
  .put('/:id', trackController.updateTrack);

module.exports = router;

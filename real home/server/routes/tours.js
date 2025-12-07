
const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.post('/', tourController.createTour);
router.get('/', tourController.getTours);

module.exports = router;

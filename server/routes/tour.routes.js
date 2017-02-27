import { Router } from 'express';
import * as TourController from '../controllers/tour.controller';
import config from '../config';

const router = new Router();

// Get all Tours
router.route('/tours').get(TourController.getTours);

// Get one Tour by cuid
router.route('/tours/:cuid').get(TourController.getTour);

router.route('/tours/search/:query').get(TourController.searchTours);
// Add a new Tour
router.route('/tours').post(TourController.addTour);

// Change a Tour by cuid
router.route('/tours/:cuid').put(TourController.changeTour);

// Delete a Tour by cuid
router.route('/tours/:cuid').delete(TourController.deleteTour);

export default router;

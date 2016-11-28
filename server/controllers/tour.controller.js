import cuid from 'cuid';
import models from '../models/index';
import Tour from '../models/tour';
import colors from 'colors';

/**
 * Get all Tours
 * @param req
 * @param res
 * @returns void
 */
export function getTours(req, res) {
    models.Tour.findAll().then((tours) => {
      console.log("Perfetto".green, tours);


      res.json(tours);
    }).catch((err) => {
      console.log("Ojee da geht was nit", err);
    });

}

/**
 * Save a Tour
 * @param req
 * @param res
 * @returns void
 */
export function addTour(req, res) {
  if (!req.body.tour.description || !req.body.tour.location || !req.body.tour.duration || !req.body.tour.price) {
    res.status(403).end();
  }
  else
  {
    const requestTour = req.body.tour;
    const newTour = {};

    //only pick wanted attributes
    newTour.cuid = cuid();
    newTour.description = requestTour.description;
    newTour.location = requestTour.location;
    newTour.duration = requestTour.duration;
    newTour.price = requestTour.price;

    models.Tour.create({...newTour}).then(tour => {
      res.json({ Tour: tour });
    }).catch(err => {
        res.status(500).send(err);
    });
  }
}

/**
 * Get a single Tour
 * @param req
 * @param res
 * @returns void
 */
export function getTour(req, res) {

  models.Tour.findOne({ where: {cuid: req.params.cuid} }).then((tour) => {
    if(tour) {
      res.json({tour});
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}

/**
 * Delete a Tour
 * @param req
 * @param res
 * @returns void
 */
export function deleteTour(req, res) {

  models.Tour.findOne({ where: {cuid: req.params.cuid} }).then((tour) => {
    if(tour) {
      tour.destroy();
      res.status(200).end();
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}



/**
 * Change a Tour
 * @param req
 * @param res
 * @returns void
 */
export function changeTour(req, res) {
  models.Tour.findOne({ where: {cuid: req.params.cuid} }).then((tour) => {
    if(tour) {
      const requestTour = req.body.tour;

     tour.update({
      description: requestTour.description,
      location: requestTour.location,
      duration: requestTour.duration,
      price: requestTour.price
})
res.status(200).end();

    } else {
      res.status(404).send();
    }
}).catch(err => res.status(500).send(err));

}
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
  if (!req.body.tour.description || !req.body.tour.location || !req.body.tour.duration || !req.body.tour.price || !req.body.tour.lenght
    || !req.body.tour.extra|| !req.body.tour.standard|| !req.body.tour.food|| !req.body.tour.accommodation|| !req.body.tour.fitnessLevel
    || !req.body.tour.teamSize|| !req.body.tour.sanitary|| !req.body.tour.electricity|| !req.body.tour.transportation) {
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
    newTour.lenght = requestTour.lenght;
    newTour.extra = requestTour.extra;
    newTour.standard = requestTour.standard;
    newTour.food = requestTour.food;
    newTour.accommodation = requestTour.accommodation;
    newTour.fitnessLevel = requestTour.fitnessLevel;
    newTour.teamSize = requestTour.teamSize;
    newTour.sanitary = requestTour.sanitary;
    newTour.electricity = requestTour.electricity;
    newTour.transportation = requestTour.transportation;

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
      price: requestTour.price,
      lenght: requestTour.lenght,
      extra: requestTour.extra,
      standard: requestTour.standard,
      food: requestTour.food,
      accommodation: requestTour.accommodation,
      fitnessLevel: requestTour.fitnessLevel,
      teamSize: requestTour.teamSize,
      sanitary: requestTour.sanitary,
      electricity: requestTour.electricity,
      transportation: requestTour.transportation,
})
res.status(200).end();

    } else {
      res.status(404).send();
    }
}).catch(err => res.status(500).send(err));

}
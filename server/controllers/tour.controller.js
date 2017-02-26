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
  // expecting ?timestamp='javascript timestamp in miliseconds'
  let timestamp = parseInt(req.query.timestamp);
  console.log('TIMESTAMP', timestamp);
  const whereClause = {};
  if (req.query.area) {
    whereClause.area = req.query.area;
  }
  if (req.query.tourStyle) {
    whereClause.tourStyle = req.query.tourStyle;
  }
  if (req.query.difficulty) {
    whereClause.difficulty = req.query.difficulty;
  }
  const date = new Date(timestamp);
  whereClause.createdAt = { $lt: date };
    models.Tour.findAll({ where: whereClause, limit: req.query.limit, order: [['createdAt', 'DESC']] }).then((tours) => {
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
  if (!req.body.tour.description || !req.body.tour.area || !req.body.tour.duration || !req.body.tour.price || !req.body.tour.lenght
    || !req.body.tour.extra|| !req.body.tour.standard|| !req.body.tour.food|| !req.body.tour.accommodation|| !req.body.tour.difficulty
    || !req.body.tour.teamSize|| !req.body.tour.sanitary|| !req.body.tour.electricity|| !req.body.tour.transportation || !req.body.tour.tourStyle) {
    res.status(403).end();
  }
  else
  {
    const requestTour = req.body.tour;
    const newTour = {};

    //only pick wanted attributes
    newTour.cuid = cuid();
    newTour.description = requestTour.description;
    newTour.area = requestTour.area;
    newTour.duration = requestTour.duration;
    newTour.price = requestTour.price;
    newTour.lenght = requestTour.lenght;
    newTour.extra = requestTour.extra;
    newTour.standard = requestTour.standard;
    newTour.food = requestTour.food;
    newTour.accommodation = requestTour.accommodation;
    newTour.difficulty = requestTour.difficulty;
    newTour.teamSize = requestTour.teamSize;
    newTour.sanitary = requestTour.sanitary;
    newTour.electricity = requestTour.electricity;
    newTour.transportation = requestTour.transportation;
    newTour.tourStyle = requestTour.tourStyle;

    models.Tour.create({...newTour}).then(tour => {
      res.json({ tour: tour });
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
  models.Tour.findOne({ where: { cuid: req.params.cuid } }).then((tour) => {
    if(tour) {
      tour.destroy();
      res.status(200).end();
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));
}

export function searchTours(req, res) {
  const whereClause = {};
  if (req.query.area) {
    whereClause.area = req.query.area;
  }
  if (req.query.tourStyle) {
    whereClause.tourStyle = req.query.tourStyle;
  }
  if (req.query.difficulty) {
    whereClause.difficulty = req.query.difficulty;
  }
  models.Tour.findAll({ where: whereClause }).then((tours) => {
    res.json(tours);
  }).catch((err) => {
    res.status(500).send(err);
  });
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
      area: requestTour.area,
      duration: requestTour.duration,
      price: requestTour.price,
      lenght: requestTour.lenght,
      extra: requestTour.extra,
      standard: requestTour.standard,
      food: requestTour.food,
      accommodation: requestTour.accommodation,
      difficulty: requestTour.difficulty,
      teamSize: requestTour.teamSize,
      sanitary: requestTour.sanitary,
      electricity: requestTour.electricity,
      transportation: requestTour.transportation,
      tourStyle: requestTour.tourStyle,

})
res.status(200).end();

    } else {
      res.status(404).send();
    }
}).catch(err => res.status(500).send(err));

}

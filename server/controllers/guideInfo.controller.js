import cuid from 'cuid';
import models from '../models/index';
import GuideInfo from '../models/guideInfo';
import colors from 'colors';

/**
 * Get all GuideInfos
 * @param req
 * @param res 
 * @returns void
 */
export function getGuideInfos(req, res) {
    models.GuideInfo.findAll().then((guideInfos) => {
      console.log("Perfetto".green, guideInfos);
      res.json(guideInfos);
    }).catch((err) => {
      console.log("Ojee da geht was nit", err);
    });

}

/**
 * Save a GuideInfo
 * @param req
 * @param res
 * @returns void
 */
export function addGuideInfo(req, res) {
  if (!req.body.guideInfo.description || !req.body.guideInfo.characterTraits || !req.body.guideInfo.characterTraitDescription) {
    res.status(403).end();
  }
  else
  {
    const requestGuideInfo = req.body.guideInfo;
    const newGuideInfo = {};

    //only pick wanted attributes
    newGuideInfo.cuid = cuid();
    newGuideInfo.description = requestGuideInfo.description;
    newGuideInfo.characterTraits = requestGuideInfo.characterTraits;
    newGuideInfo.characterTraitDescription = requestGuideInfo.characterTraitDescription;
    newGuideInfo.userCuid = requestGuideInfo.userCuid;


    models.GuideInfo.create({...newGuideInfo}).then(guideInfo => {
      res.json({ GuideInfo: guideInfo });
    }).catch(err => {
        res.status(500).send(err);
    });
  }
}

/**
 * Get a GuideInfo
 * @param req
 * @param res
 * @returns void
 */
export function getGuideInfo(req, res) {
  models.GuideInfo.findOne({ where: {userCuid: req.params.cuid} }).then((guideInfo) => {
    if(guideInfo) {
      res.json({guideInfo});
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}

/**
 * Delete a GuideInfo
 * @param req
 * @param res
 * @returns void
 */
export function deleteGuideInfo(req, res) {

  models.GuideInfo.findOne({ where: {userCuid: req.params.cuid} }).then((guideInfo) => {
    if(guideInfo) {
      guideInfo.destroy();
      res.status(200).end();
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}



/**
 * Change a GuideInfo
 * @param req
 * @param res
 * @returns void
 */
export function changeGuideInfo(req, res) {
  models.GuideInfo.findOne({ where: {userCuid: req.params.cuid} }).then((guideInfo) => {
    if(guideInfo) {
      const requestGuideInfo = req.body.guideInfo;

     guideInfo.update({
      description: requestGuideInfo.description,
      characterTraits: requestGuideInfo.characterTraits,
      characterTraitDescription: requestGuideInfo.characterTraitDescription,
})
  res.json({ GuideInfo: guideInfo });
  res.status(200).end();


    } else {
      res.status(404).send();
    }
}).catch(err => res.status(500).send(err));

}
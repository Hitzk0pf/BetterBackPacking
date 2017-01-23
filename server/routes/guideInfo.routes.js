import { Router } from 'express';
import * as GuideInfoController from '../controllers/guideInfo.controller';
import config from '../config';

const router = new Router();

// Get all GuideInfo
router.route('/guideInfos').get(GuideInfoController.getGuideInfos);

// Get one GuideInfo by cuid
router.route('/guideInfos/:cuid').get(GuideInfoController.getGuideInfo);

// Add a new GuideInfo
router.route('/guideInfos').post(GuideInfoController.addGuideInfo);

// Change a GuideInfo by cuid
router.route('/guideInfos/:cuid').put(GuideInfoController.changeGuideInfo);

// Delete a GuideInfo by cuid
router.route('/guideInfos/:cuid').delete(GuideInfoController.deleteGuideInfo);

export default router;


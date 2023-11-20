import { Router } from 'express';
const router = Router();

import { home } from '../constants/routes';
import vrc from '../controllers/votingResultController';

/* GET home page. */
router.get(home, vrc.getVotingResult); 

export default router;
import { Router } from 'express';
const router = Router();

import { home, voting_submit, voting_result } from '../constants/routes';
import vc from '../controllers/votingController';

// router.get(home, vc.checkVoting, vc.getVoting);
router.get(home, vc.checkVoting);

router.post(voting_submit, vc.checkVoting, vc.postVotingSubmit);

router.get(voting_result(), vc.logout, vc.getVotingResult);

export default router;
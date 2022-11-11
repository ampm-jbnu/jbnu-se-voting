import { Router } from 'express';
const router = Router();

import { home, voting_submit, voting_result } from '../constants/routes';
import vc from '../controllers/votingController';

// 투표 진행시
router.get(home, vc.checkVoting, vc.getVoting);

// 투표 종료 시
//router.get(home, vc.checkVoting);

router.post(voting_submit, vc.checkVoting, vc.postVotingSubmit);

router.get(voting_result(), vc.logout, vc.getVotingResult);

export default router;
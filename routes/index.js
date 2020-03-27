import { Router } from 'express';
const router = Router();

import { home, login } from '../constants/routes';
import gc from '../controllers/globalController';

/* GET home page. */
router.get(home, gc.getIndex); 

/* POST home login. */
router.post(login, gc.postLogin);

export default router;
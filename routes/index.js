import { Router } from 'express';
const router = Router();

import { admin, home, login } from '../constants/routes';
import gc from '../controllers/globalController';

/* GET home page. */
router.get(home, gc.getIndex); 

/* POST home login. */
router.post(login, gc.postLogin);

router.get(admin, gc.getAdmin)

export default router;
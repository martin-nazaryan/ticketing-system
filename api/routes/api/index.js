import { Router } from 'express';

import auth from '../../middlewares/auth';
import tickets from './tickets';

const router = new Router();

router
  .use(auth)
  .use('/tickets', tickets)

export default router;

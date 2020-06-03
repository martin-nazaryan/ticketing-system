import { Router } from 'express';
import { TicketController } from '../../controllers';

const router = new Router();

router
  .get('/', TicketController.all)
  .post('/', TicketController.create)
  .put('/attach/:id', TicketController.attach);

export default router;

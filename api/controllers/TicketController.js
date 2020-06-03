import TicketSvc from '../services/TicketSvc';
import StreamSvc from '../services/StreamSvc';
import UsersSvc from '../services/UsersSvc';

export default class TicketController {
  static async all(req, res, next) {
    try {
      StreamSvc.sendTickets(req.user._id);
      res.end();
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    const { title, description } = req.body;

    const ticket = await TicketSvc.createTicket({
      title,
      description,
    });

    try {
      const openedTickets = await TicketSvc.getTickets({ attached: false });
      StreamSvc.io.emit('openedTickets', openedTickets);
    } catch (e) {
      next(e);
    }

    res.json(ticket);
  }

  static async attach(req, res, next) {
    const { id } = req.params;

    try {
      const ticket = await TicketSvc.updateTicket(id, {
        attached: true,
      }, {
        new: true,
      });

      await UsersSvc.updateUser(req.user._id, {
        $push: {
          tickets: ticket,
        },
      });

      StreamSvc.sendTickets(req.user._id);
    } catch (e) {
      next(e);
    }

    res.end();
  }
}

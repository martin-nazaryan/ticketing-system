import { Types } from 'mongoose';
import { Ticket } from '../models';

export default class TicketSvc {
  static getTickets(filter = {}) {
    return Ticket.find(filter);
  }

  static updateTicket(id, data) {
    return Ticket.findOneAndUpdate({
      _id: typeof id === 'string' ? Types.ObjectId(id) : id,
    }, data);
  }

  static createTicket(data) {
    return Ticket.create({
      title: data.title,
      description: data.description,
    });
  }
}

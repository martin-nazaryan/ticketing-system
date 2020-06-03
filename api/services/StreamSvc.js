import io from 'socket.io';
import passportJwtSocketIo from 'passport-jwt.socketio';
import TicketSvc from './TicketSvc';
import UsersSvc from './UsersSvc';
import { passportCb, passportOptions } from '../middlewares/passport';

export default class StreamSvc {
  static io = null;

  static clients = {};

  static initSocket(server) {
    const ioInstance = io(server);
    ioInstance.use(passportJwtSocketIo.authorize(passportOptions, passportCb));
    ioInstance.on('connection', async (client) => {
      this.clients[client.handshake.user.id] = client;
      client.on('disconnect', () => delete this.clients[client.handshake.user.id]);
    });
    this.io = ioInstance;
  }

  static async sendTickets(id) {
    try {
      const { tickets: myTickets } = await UsersSvc.getUser(id).populate('tickets');
      const openedTickets = await TicketSvc.getTickets({ attached: false });
      this.clients[id].emit('myTickets', myTickets);
      this.io.emit('openedTickets', openedTickets);
    } catch (e) {
      console.log(e);
    }
  }
}

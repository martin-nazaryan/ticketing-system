import api from '../services/api';
import cookies from "js-cookie";
import {ACCESS_TOKEN} from "../constants";

export default class TicketSvc {
  static async getTickets() {
    try {
      await api.get(`/api/tickets`);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        cookies.remove(ACCESS_TOKEN);
        window.history.href = '/login';
      }
    }
  }

  static async updateTicket(id, data = {}) {
    try {
      await api.put(`/api/tickets/attach/${id}`, data);
    } catch (e) {
      console.log(e);
    }
  };
};

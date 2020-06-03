import { Types } from 'mongoose';
import { User } from '../models';

export default class UsersSvc {
  static getUser(id) {
    return User.findOne({
      _id: typeof id === 'string' ? Types.ObjectId(id) : id,
    });
  }

  static updateUser(id, data) {
    return User.findOneAndUpdate({
      _id: typeof id === 'string' ? Types.ObjectId(id) : id,
    }, data, { new: true });
  }
}

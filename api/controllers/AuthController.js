import jwt from 'jsonwebtoken';
import { User } from '../models';
import { setResult } from '../helpers';

export default class AuthController {
  static async signUp(req, res) {
    const { username, password } = req.body;

    try {
      const user = new User({ username, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.SECRET || 'your-secret');

      return res.json({
        token,
        user: {
          username: user.username,
        },
      });
    } catch (e) {
      return res.json(setResult(0, e, 'User Save Error'));
    }
  }

  static async signIn(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (user) {
        if (!user.checkPassword(password)) {
          return res.json(setResult(0, {}, 'Invalid Password'));
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET || 'secret');

        return res.json(setResult(1, {
          token,
          user: {
            username: user.username,
          },
        }));
      }

      return res.json(setResult(0, {}, 'Invalid Username'));
    } catch (e) {
      console.log(e);
      return res.json(setResult(0, e, 'Find User Error'));
    }
  }
}

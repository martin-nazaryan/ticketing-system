import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models';

export const passportOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('token'), // for io
    ExtractJwt.fromAuthHeaderAsBearerToken(), // for rest
  ]),
  secretOrKey: process.env.SECRET,
};

export const passportCb = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
};

const strategy = new JwtStrategy(passportOptions, passportCb);
passport.use(strategy);

export default passport;

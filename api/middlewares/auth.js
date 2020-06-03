import passport from 'passport';

export default async (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return res.status(401).json(err);
      }

      if (!user) {
        return res.status(401).json('Unauthorized');
      }

      req.user = user;

      next();
    })(req, res, next);
  } catch (e) {
    return res.status(401).end();
  }
};

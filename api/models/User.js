import crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required'],
    unique: true,
  },
  passwordHash: String,
  salt: String,
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
}, {
  timestamps: true,
});

userSchema.virtual('password')
  .set(function (password) {
    console.log('set');
    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(128)
        .toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
      return;
    }

    this.salt = undefined;
    this.passwordHash = undefined;
  })

  .get(function () {
    console.log('get');
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password || !this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
    .toString() === this.passwordHash;
};

userSchema.statics.seed = async function () {
  try {
    const users = await this.find();
    if (!users.length) {
      const user = new User({
        username: 'admin',
        password: '123456',
      });
      user.save((err) => {
        if (err) console.log(err);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const User = mongoose.model('User', userSchema);

User.seed();

export default User;

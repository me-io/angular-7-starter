import * as bcrypt from 'bcryptjs';
import { Model, model, Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUser extends IUserDocument {
  comparePassword(password: string, callback: object): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export const userSchema: Schema = new Schema({
  username: { type: String },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String },
  role: { type: String },
});

// Before saving the user, hash the password
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.static('hashPassword', (password: string): string => {
  return bcrypt.hashSync(password);
});


// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  cellphone: string;
  address: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  address: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

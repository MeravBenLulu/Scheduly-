import mongoose, { Document, Schema } from 'mongoose';

export interface IBusiness extends Document {
  _id: string;
  name: string;
  description: string;
  email: string;
  telephone: string;
  address: string;
  managerId: string;
}

const businessSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  address: { type: String, required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;

import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  _id: string;
  name: string;
  description: string;
  timeInMinutes: number;
  price: number;
  businessId: string;
}

const serviceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  timeInMinutes: { type: Number, required: true },
  price: { type: Number, required: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
});

const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;

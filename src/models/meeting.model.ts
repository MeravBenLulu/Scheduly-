import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting extends Document {
  _id: string;
  serviceId: string;
  businessId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

const meetingSchema: Schema = new Schema({
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
meetingSchema.index({ businessId: 1, startDate: 1, endDate: 1 });

const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);

export default Meeting;

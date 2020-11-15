import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const componentSchema = new Schema({
  percentage: { type: Number, required: true },
  year: { type: Number, required: true },
  variety: { type: String, required: true },
  region: { type: String, required: true },
}, {
  _id: false,
});

const breakdownSchema = new Schema({
  lotCode: { type: String, required: true },
  volume: { type: Number, required: true },
  description: { type: String },
  tankCode: { type: String, required: true },
  productState: { type: String },
  ownerName: { type: String, required: true },
  components: {
    type: [componentSchema],
    required: true,
  },
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

export interface Component {
  percentage: number;
  year: number;
  variety: string;
  region: string;
}

export interface Breakdown {
  lotCode: string;
  volume: number;
  description?: string;
  tankCode: string;
  productState?: string;
  ownerName: string;
  components: Component[];
};

export interface BreakdownDocument extends Breakdown, mongoose.Document {}

export default mongoose.model<BreakdownDocument>('Breakdown', breakdownSchema);

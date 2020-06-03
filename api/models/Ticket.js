import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  attached: {
    type: String,
    default: false,
    index: true,
  },
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;

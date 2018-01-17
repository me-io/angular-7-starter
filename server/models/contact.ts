import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

const contactSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
contactSchema.plugin(timestamps);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

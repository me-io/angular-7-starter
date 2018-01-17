import * as mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

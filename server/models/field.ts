import * as mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const Field = mongoose.model('Field', fieldSchema);

export default Field;

import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

const fieldSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});
fieldSchema.plugin(timestamps);

const Field = mongoose.model('Field', fieldSchema);

export default Field;

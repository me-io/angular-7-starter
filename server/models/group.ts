import * as mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const Group = mongoose.model('Group', groupSchema);

export default Group;

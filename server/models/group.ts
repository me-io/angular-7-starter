import * as mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  ring_tone: String,
});

const Group = mongoose.model('Group', groupSchema);

export default Group;

import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

const groupSchema = new mongoose.Schema({
  name: String,
  ring_tone: String,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
groupSchema.plugin(timestamps);

const Group = mongoose.model('Group', groupSchema);

export default Group;

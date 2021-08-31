const mongoose = require('mongoose');

const editSchema = new mongoose.Schema({
   author: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
   dateCreated: {type: mongoose.SchemaTypes.Date},
   content: {type: mongoose.SchemaTypes.String},
   article:{type: mongoose.SchemaTypes.ObjectId, ref: 'Article'}
});

module.exports = mongoose.model('Edit', editSchema);

// Added this in, for figuring out 8/30
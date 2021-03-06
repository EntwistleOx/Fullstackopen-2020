/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqVal = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 8,
  },
});

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const obj = returnedObject;
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

phoneBookSchema.plugin(uniqVal);

module.exports = mongoose.model('Person', phoneBookSchema);

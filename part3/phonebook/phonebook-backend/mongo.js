const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack2020:${password}@notes.i67jg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', noteSchema);

const person = new Person({
  name: `${name}`,
  number: `${number}`,
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`added ${name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

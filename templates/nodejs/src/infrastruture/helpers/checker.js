const {
  refinement,
  Number,
  Object,
  String
} = require('tcomb');

const Positive = refinement(Number, (n) => n >= 0);
const NotNull = refinement(Object, (o) => o !== null || o !== undefined);
const StringNotNull = refinement(String, (s) => s !== '');

module.exports = {
  Positive,
  NotNull,
  StringNotNull
};
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  control: { type: String, required: true },
  registrationOpen: { type: Boolean, required: true },
  displayInfo: { type: Boolean, required: true },
});

module.exports = mongoose.model("Control", schema);

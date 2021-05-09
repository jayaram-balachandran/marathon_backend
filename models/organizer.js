var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  registrationOpen: { type: Boolean, required: true },
  marathonDate: { type: String, required: true },
  marathonTime: { type: String, required: true },
  maathonLocation: { type: String, required: true },
});

module.exports = mongoose.model("Organizer", schema);

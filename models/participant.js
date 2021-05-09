var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  DOB: { type: String, required: true },
  email: { type: String, required: true },
  paymentInfo: { type: String, required: true },
  creation_dt: { type: String, required: true },
});

module.exports = mongoose.model("Participant", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema(
  {
    username: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: Number, required: true },
    CV: { type: Number, required: true },
  },

  {
    timestamps: true,
  }
);

const info = mongoose.model("information ", infoSchema);

module.exports = info;

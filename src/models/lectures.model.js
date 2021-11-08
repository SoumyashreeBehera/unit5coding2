const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    batch: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("lecture", lecturesSchema);

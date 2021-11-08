const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    roll_number: { type: Number, required: true },
    user: {
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

module.exports = mongoose.model("student", studentSchema);

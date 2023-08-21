const { Schema, model } = require("mongoose");

const DailyEntrySchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
      default: null,
      ref: "User",
    },
    date: {
      type: String,
    },
    entry: {
      type: String,
    },
    analysis: {
      type: String,
    },
    emoji: {
      type: String,
    },
    mood: {
      type: String,
      required: [true, "El estado de animo es obligatoria"],
      enum: ["Feliz", "Triste", "Enojado", "Neutral", "Shock"],
    },
  },
  { timestamps: true },
);

DailyEntrySchema.methods.toJSON = function () {
  const { __v, _id, ...dailyEntry } = this.toObject();
  dailyEntry.id = _id;
  return dailyEntry;
};

module.exports = model("DailyEntry", DailyEntrySchema);

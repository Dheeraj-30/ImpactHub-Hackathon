import mongoose from "mongoose";

const RaiseQuestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    peopleAffected: { type: Number, required: true },
    volunteersNeeded: { type: Number, default: 0 },
    urgency: { type: String, required: true },
    location: { type: String, required: true },

    image: { type: String, default: "" },
  },
  { timestamps: true },
);

const RaiseQuestModel =
  mongoose.models.RaiseQuest || mongoose.model("RaiseQuest", RaiseQuestSchema);

export default RaiseQuestModel;

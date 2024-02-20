import { Schema, models, model, Document } from "mongoose";

interface IAnswer extends Document {
  content: string;
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  // array of id of people of upvoted because we don't want to have a upvote where you can upvote the same thing multiple times
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;

import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  Questions: Schema.Types.ObjectId[];
  Followers?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  Questions: [{ type: Schema.Types.ObjectId, required: true, ref: "Question" }],
  Followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;

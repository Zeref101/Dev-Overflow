import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // TO LINK THE CLERK ACCOUNT WITH OUR APPLICATION
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Ensure unique usernames
  email: { type: String, required: true, unique: true }, // Ensure unique emails
  password: { type: String, required: true }, // Consider secure hashing
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }], // References to saved questions
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;

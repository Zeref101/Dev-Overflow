"use server";

import Question from "@/database/question.model";
import { connectionToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
  try {
    connectionToDatabase();

    // GET THE PARAMS FROM THE ASK QUESTION PAGE
    const { title, content, tags, author, path } = params;

    // CREATE A QUESTION
    const question = await Question.create({
      title,
      content,
      author,
    });

    // CREATE TAGS OR GET THEM IF THEY EXISTS
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // This regex is used to find a tag that matches the tag variable.
        { $setOnInsert: { name: tag }, $push: { Questions: question._id } }, // If a matching tag is found, it appends the question._id to its question array, associating the question with the tag.
        { upsert: true, new: true } // If no matching tag is found, it creates a new tag with the name and question fields.
      );
      tagDocuments.push(existingTag._id);
    }

    // So, in plain language, this regex does the following:
    // It searches for documents where the name field:
    // Starts with the value of the tag variable.
    // Ends with the value of the tag variable (meaning it matches the entire tag).
    // Successfully matches regardless of case (e.g., "javascript" would match "JavaScript").

    // CREATE AN INTERACTION RECORD FOR THE USER'S ASK QUESTION ACTION

    // INCREMENT THE AUTHOR'S REPUTATION BY +5 FOR ASKING A QUESTION
  } catch (error) {}
}

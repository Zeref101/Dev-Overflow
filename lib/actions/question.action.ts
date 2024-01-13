"use server";

import Question from "@/database/question.model";
import { connectionToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

// GET THE QUESTIONS FROM DB

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectionToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tag", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
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
        { upsert: true, new: true }, // If no matching tag is found, it creates a new tag with the name and question fields.
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tag: { $each: tagDocuments } },
    });

    revalidatePath(path);
    // revalidate because after asking the question it wont recall the fetch function we need to reload the site
    // revalidate allows you to specify a time interval (in seconds) after which a page or data should be revalidated (refetched from the server) to check for updates.
  } catch (error) {}
}

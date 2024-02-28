"use server";
import Answer from "@/database/answer.model";
import { connectionToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
// import User from "@/database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectionToDatabase();

    const { author, content, question, path } = params;

    const newanswer = await Answer.create({
      author,
      content,
      question,
    });

    //  adding answer to the question's array of answer

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newanswer._id },
    });

    if (!newanswer) {
      throw new Error("Answer not created, Please try again later...");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectionToDatabase();

    const { questionId } = params;
    const answers = await Answer.find({ questionId })
      .populate("author", "_id clerkId name picture") // GETS _id clerkId name and picture from author
      .sort({ createdAt: -1 });

    if (!answers) {
      throw new Error("No answers found for the given question ID.");
    }

    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectionToDatabase();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      { new: true }
    );

    if (!updatedAnswer) {
      throw new Error(`Answer not found`);
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectionToDatabase();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      { new: true }
    );

    if (!updatedAnswer) {
      throw new Error(`Answer not found`);
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

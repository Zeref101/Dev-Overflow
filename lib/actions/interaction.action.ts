"use server";

import { ViewQuestionParams } from "./shared.types";
import { connectionToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectionToDatabase();
    const { questionId, userId } = params;

    // * update the view coount for the question

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return console.log("user has already interacted with this question");
      }

      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

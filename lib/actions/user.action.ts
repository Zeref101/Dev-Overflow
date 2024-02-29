"use server";

import User from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  // GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getUserById(params: any) {
  try {
    connectionToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    throw new Error();
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectionToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectionToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectionToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectionToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const Users = await User.find({}).sort({ created: -1 });

    return Users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveQuestions(params: ToggleSaveQuestionParams) {
  try {
    connectionToDatabase();

    const { userId, questionId, path, hasSaved } = params;

    if (hasSaved) {
      const savedQuestionResponse = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
      revalidatePath(path);
      return savedQuestionResponse;
    }

    const savedQuestionResponse = await User.findByIdAndUpdate(
      userId,
      {
        $push: { saved: questionId },
      },
      { new: true }
    );

    if (!savedQuestionResponse) {
      throw new Error(`Question not found`);
    }

    revalidatePath(path);

    return savedQuestionResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectionToDatabase();

    const { clerkId, searchQuery, page, pageSize, filter } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const allSavedQuestions = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tag", model: "Tag", select: "_id name" },
        { path: "author", model: "User", select: "_id clerkId name picture" },
      ],
      select: {
        _id: 1,
        title: 1,
        views: 1,
        upvotes: 1,
        downvotes: 1,
        answers: 1,
        createdAt: 1,
      },
    });

    if (!allSavedQuestions) {
      throw new Error(`Questions not found`);
    }

    return allSavedQuestions.saved;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

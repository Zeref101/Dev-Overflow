"use server";

import User from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
    throw new Error();
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
  } catch (error) {}
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectionToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // DELETE EVERYTHING THAT THE USER HAS EVER DONE questions, answers, etc

    //  get questions of that particular user

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id",
    );

    //  delete user questions

    await Question.deleteMany({ author: user._id });

    // TODO: DELETE USER ANSWERS, COMMENTS, ETC

    // double-checks for any remaining user data
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

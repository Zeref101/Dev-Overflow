"use server";

import User from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";

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

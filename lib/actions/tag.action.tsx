"use server";

import User from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function gettopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectionToDatabase();
        const { userId } = params;

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        //  find interaction for the user and group by tags

        return [{ _id: 1, name: 'tag1' }, { _id: 2, name: 'tag2' }];
    } catch (error) {
        console.log(error);
        throw error;
    }
}
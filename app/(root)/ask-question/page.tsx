import { Question } from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  // const { userId } = auth();
  const userId = "CL123456";
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ userId });
  // console.log(mongoUser);
  return (
    <div>
      <h1 className="h1-bold text-dark200_light900">Ask a question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;

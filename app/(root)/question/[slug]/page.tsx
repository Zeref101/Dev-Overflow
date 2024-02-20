import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface QuestionTagProps {
  _id: string;
  name: string;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const questionId = params.slug;
  const result = await getQuestionById({ questionId });
  console.log(result);

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className=" flex w-full flex-col items-start justify-start">
        <div className=" flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.question.author.clerk_id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.question.author.picture}
              alt={`Profile Picture`}
              width={25}
              height={25}
              className=" h-[25px] w-[25px] rounded-full object-cover"
            />
            <p className=" paragraph-semibold text-dark300_light700">
              {result.question.author.name}
            </p>
          </Link>
          <div className="flex justify-end text-white">
            <Votes
              type={"question"}
              itemId={JSON.stringify(result.question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.question.upvotes.length}
              hasupVoted={result.question.upvotes.includes(mongoUser._id)}
              downvotes={result.question.downvotes.length}
              hasdownVoted={result.question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result.question._id)}
            />
          </div>
        </div>
        <div className=" flex flex-col justify-start">
          <h2 className=" h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {result.question.title}
          </h2>
          <div className=" mb-8 mt-5 flex flex-wrap gap-4">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt="clockIcon"
              value={`asked ${getTimestamp(result.question.createdAt)}`}
              title=""
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              imgUrl="/assets/icons/message.svg"
              alt="Message"
              value={formatAndDivideNumber(result.question.answers.length)}
              title="Answers"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              imgUrl="/assets/icons/eye.svg"
              alt="eye"
              value={formatAndDivideNumber(result.question.views)}
              title="Views"
              textStyles="small-medium text-dark400_light800"
            />
          </div>
        </div>
        <div className=" text-dark200_light900">
          <ParseHTML data={result.question.content} />
        </div>
      </div>

      <div className=" mt-8 flex gap-4">
        {result.question.tag.map((tag: QuestionTagProps) => {
          return (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          );
        })}
      </div>
      <AllAnswers
        questionId={questionId}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.question.answers.length}
      />
      <Answer
        question={result.question.content}
        questionId={JSON.stringify(result.question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;

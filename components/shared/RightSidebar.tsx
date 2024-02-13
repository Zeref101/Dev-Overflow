import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const hotQuestions = [
  { _id: 1, title: "How do I use express as a cutom server in nextJs" },
  {
    _id: 2,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 3, title: "Is it only me or the font is bolder than necessary?" },
  { _id: 4, title: "Redux Toolkit Not Updating State as Expected" },
  { _id: 5, title: "Async/Await Function Not Handling Errors Properly" },
];

const popularTags = [
  { _id: '1', name: "react", totalQuestions: 5 },
  { _id: '2', name: "node", totalQuestions: 2 },
  { _id: '3', name: "redux", totalQuestions: 1 },
  { _id: '4', name: "vue", totalQuestions: 6 },
  { _id: '5', name: "flutter", totalQuestions: 15 },
];

const RightSidebar = () => {
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky 
        left-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none 
        max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => {
            return (
              <Link
                key={question._id}
                href={`/question/${question._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="text-dark200_light900 body-medium">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron-right"
                  height={20}
                  width={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="h3-bold text-dark200_light900 mt-28">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;

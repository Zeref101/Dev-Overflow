import * as z from "zod";

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Please enter a title with at least 5 characters." })
    .max(130, {
      message: "Limit your title to a maximum of 130 characters.",
    }),
  explanation: z.string().min(10, {
    message:
      "Please provide a detailed explanation with a minimum of 100 characters.",
  }),
  tags: z
    .array(
      z.string().min(1).max(15, {
        message: "Each tag should have between 1 and 5 characters.",
      })
    )
    .min(1, {
      message: "Include at least one tag.",
    })
    .max(3, {
      message: "You can add up to a maximum of 3 tags.",
    }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

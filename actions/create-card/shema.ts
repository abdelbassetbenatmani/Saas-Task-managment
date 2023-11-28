import { z } from "zod";

export const createCardShema = z.object({
  title: z
    .string({
      required_error: "Card title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Card title must be at least 3 characters",
    })
    .max(255, {
      message: "Card title must be less than 255 characters",
    }),
  boardId: z
    .string(),
  listId: z
    .string()
});

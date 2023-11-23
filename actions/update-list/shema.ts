import { z } from "zod";

export const updateListShema = z.object({
  title: z
    .string({
      required_error: "List title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Board title must be at least 3 characters",
    })
    .max(255, {
      message: "Board title must be less than 255 characters",
    }),
  id: z
    .string(),
  boardId: z
    .string()
});

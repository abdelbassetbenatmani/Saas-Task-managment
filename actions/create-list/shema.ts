import { z } from "zod";

export const createListShema = z.object({
  title: z
    .string({
      required_error: "List title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "List title must be at least 3 characters",
    })
    .max(255, {
      message: "List title must be less than 255 characters",
    }),
  boardId: z
    .string()
});

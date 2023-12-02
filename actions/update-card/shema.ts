import { z } from "zod";

export const updateCardShema = z.object({
  title: z.optional(
    z
      .string({
        required_error: "Card title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Card title must be at least 3 characters",
      })
      .max(255, {
        message: "Card title must be less than 255 characters",
      })
  ),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Card description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Card description must be at least 3 characters",
      })
  ),
});

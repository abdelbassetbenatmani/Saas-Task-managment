import { z } from "zod";

export const createBoardShema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
    })
    .min(3, {
      message: "Board title must be at least 3 characters",
    })
    .max(255, {
      message: "Board title must be less than 255 characters",
    }),
});

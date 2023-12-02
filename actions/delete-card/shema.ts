import { z } from "zod";

export const deleteCardShema = z.object({
  id: z.string(),
  boardId: z.string(),
});

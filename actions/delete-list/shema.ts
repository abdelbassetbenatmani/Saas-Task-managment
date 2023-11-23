import { z } from "zod";

export const deleteListShema = z.object({
  id: z.string(),
  boardId: z.string(),
});

import { z } from "zod";

export const copyListShema = z.object({
  id: z.string(),
  boardId: z.string(),
});

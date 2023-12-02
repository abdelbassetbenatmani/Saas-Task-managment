import { z } from "zod";

export const copyCardShema = z.object({
  id: z.string(),
  boardId: z.string(),
});

import { z } from "zod";

export const deleteBoardShema = z.object({
  id: z
    .string()
});

import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { stripeRedirectSchema } from "./shema";

export type InputType = z.infer<typeof stripeRedirectSchema>;
export type OutputType = ActionState<InputType, string>;

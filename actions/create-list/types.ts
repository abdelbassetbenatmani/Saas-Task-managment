import { z } from "zod";

import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {createListShema} from "./shema";

export type InputType = z.infer<typeof createListShema>;
export type OutputType = ActionState<InputType, List>;

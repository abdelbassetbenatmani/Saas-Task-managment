import { z } from "zod";

import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {updateListShema} from "./shema";

export type InputType = z.infer<typeof updateListShema>;
export type OutputType = ActionState<InputType, List>;

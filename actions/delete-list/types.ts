import { z } from "zod";

import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {deleteListShema} from "./shema";

export type InputType = z.infer<typeof deleteListShema>;
export type OutputType = ActionState<InputType, List>;

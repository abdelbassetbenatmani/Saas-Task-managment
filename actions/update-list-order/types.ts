import { z } from "zod";

import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {updateListOrderShema} from "./shema";

export type InputType = z.infer<typeof updateListOrderShema>;
export type OutputType = ActionState<InputType, List[]>;

import { z } from "zod";

import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {copyListShema} from "./shema";

export type InputType = z.infer<typeof copyListShema>;
export type OutputType = ActionState<InputType, List>;

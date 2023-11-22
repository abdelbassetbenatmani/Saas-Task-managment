import { z } from "zod";

import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {deleteBoardShema} from "./shema";

export type InputType = z.infer<typeof deleteBoardShema>;
export type OutputType = ActionState<InputType, Board>;

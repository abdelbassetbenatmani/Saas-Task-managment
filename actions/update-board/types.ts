import { z } from "zod";

import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {updateBoardShema} from "./shema";

export type InputType = z.infer<typeof updateBoardShema>;
export type OutputType = ActionState<InputType, Board>;
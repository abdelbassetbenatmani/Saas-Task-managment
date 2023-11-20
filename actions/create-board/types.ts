import { z } from "zod";

import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {createBoardShema} from "./shema";

export type InputType = z.infer<typeof createBoardShema>;
export type OutputType = ActionState<InputType, Board>;

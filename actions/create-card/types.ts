import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {createCardShema} from "./shema";

export type InputType = z.infer<typeof createCardShema>;
export type OutputType = ActionState<InputType, Card>;

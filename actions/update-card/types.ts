import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {updateCardShema} from "./shema";

export type InputType = z.infer<typeof updateCardShema>;
export type OutputType = ActionState<InputType, Card>;

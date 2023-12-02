import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {deleteCardShema} from "./shema";

export type InputType = z.infer<typeof deleteCardShema>;
export type OutputType = ActionState<InputType, Card>;

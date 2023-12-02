import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {copyCardShema} from "./shema";

export type InputType = z.infer<typeof copyCardShema>;
export type OutputType = ActionState<InputType, Card>;

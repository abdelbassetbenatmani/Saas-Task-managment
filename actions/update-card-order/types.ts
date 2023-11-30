import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import {updateCardOrderShema} from "./shema";

export type InputType = z.infer<typeof updateCardOrderShema>;
export type OutputType = ActionState<InputType, Card[]>;

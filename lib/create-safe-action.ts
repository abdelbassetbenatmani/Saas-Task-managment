import { z } from "zod";

export type FieldsError<T> = {
  [K in keyof T]?: string;
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldsError<TInput>;
  error?: string | null;
  data?: TOutput;
};
export const creatSafeAction = <TInput, TOutput>(
  shema: z.Schema<TInput>,
  action: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validateData = shema.safeParse(data);
    if (!validateData.success) {
      return {
        fieldErrors: validateData.error.flatten()
          .fieldErrors as FieldsError<TInput>,
      };
    }
    return action(validateData.data);
  };
};


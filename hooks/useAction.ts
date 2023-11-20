import { useState, useCallback } from "react";

import { ActionState, FieldsError } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface ActionStateOptions< TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: ActionStateOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldsError<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const excute = useCallback(async (data: TInput) => {
    setIsLoading(true);

    try {
      const result = await action(data);
      if (!result) {
        return;
      }
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      if (result.error) {
        setError(result.error);
        options.onError?.(result.error);
      }
      if (result.data) {
        setData(result.data);
        options.onSuccess?.(result.data);
      }
    } finally {
      setIsLoading(false);
      options.onComplete?.();
    }
  }, [action,options]);

    return {
        excute,
        fieldErrors,
        error,
        data,
        isLoading,
    };
};
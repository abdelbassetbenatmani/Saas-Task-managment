import { XCircle } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormErrors = ({ id, errors }: Props) => {
  if (!errors) {
    return null;
  }
  return (
    <div>
      {errors &&
        errors[id] &&
        errors[id]?.map((error, i) => (
          <div key={i} className="text-xs text-red-500 flex items-center p-2 font-medium">
            <XCircle className="inline-block w-4 h-4 mr-1" />
            <span>{error}</span>
          </div>
        ))}
    </div>
  );
};

export default FormErrors;

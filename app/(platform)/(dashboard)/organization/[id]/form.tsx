"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import { useAction } from "@/hooks/useAction";

const Form = () => {
  const { excute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    excute({ title });
  };
  return (
    <form action={onSubmit}>
      <FormInput
        id="title"
        label="Title"
        placeholder="Enter title"
        errors={fieldErrors as Record<string, string[] | undefined>}
      />
      <FormSubmit className="mt-5">Submit</FormSubmit>
    </form>
  );
};

export default Form;

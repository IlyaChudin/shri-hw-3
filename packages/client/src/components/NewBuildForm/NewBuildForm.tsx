import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import FormField from "../FormField";
import Input from "../Input";
import Button from "../Button";
import cn from "../../classname";

const newFormBuild = cn("new-build-form");

interface NewBuildFormProps {
  onSubmit: (data: NewBuildFormData) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: string;
}

export interface NewBuildFormData {
  hash: string;
  branch: string;
}

const NewBuildForm: React.FC<NewBuildFormProps> = ({ onSubmit, onCancel, error }) => {
  const { register, setValue, handleSubmit } = useForm<NewBuildFormData>();

  return (
    <Form title="New build" mix={newFormBuild()} error={error} onSubmit={handleSubmit(onSubmit)}>
      <FormField title="Commit hash" mix={newFormBuild("field")}>
        <Input
          name="hash"
          placeholder="66e50bf"
          clearButton
          register={register}
          setValue={setValue}
          mix={newFormBuild("input")}
        />
      </FormField>
      <FormField title="Branch" mix={newFormBuild("field")}>
        <Input
          name="branch"
          placeholder="master"
          clearButton
          register={register}
          setValue={setValue}
          mix={newFormBuild("input")}
        />
      </FormField>
      <div className={newFormBuild("buttons")}>
        <Button type="submit" text="Run build" view="accent" size="m" mix={newFormBuild("button")} />
        <Button text="Cancel" size="m" mix={newFormBuild("button")} onClick={onCancel} />
      </div>
    </Form>
  );
};
export default NewBuildForm;

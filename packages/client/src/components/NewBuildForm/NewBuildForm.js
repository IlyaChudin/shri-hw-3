import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import FormField from "../FormField";
import Input from "../Input";
import Button from "../Button";
import cn from "../../classname";

const newFormBuild = cn("new-build-form");

function NewBuildForm(props) {
  const { onSubmit, onCancel, error } = props;
  const { register, setValue, handleSubmit } = useForm();

  return (
    <Form title="New build" mix={newFormBuild()} error={error} onSubmit={handleSubmit(onSubmit)}>
      <FormField title="Commit hash" type="v" mix={newFormBuild("field")}>
        <Input
          name="hash"
          placeholder="66e50bf"
          size="m"
          clearButton
          register={register}
          setValue={setValue}
          mix={newFormBuild("input")}
        />
      </FormField>
      <FormField title="Branch" type="v" mix={newFormBuild("field")}>
        <Input
          name="branch"
          placeholder="master"
          size="m"
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
}
export default NewBuildForm;

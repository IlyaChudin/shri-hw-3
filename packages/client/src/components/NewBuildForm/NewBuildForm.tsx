import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Form title={t("newBuildForm.newBuild")} mix={newFormBuild()} error={error} onSubmit={handleSubmit(onSubmit)}>
      <FormField title={t("newBuildForm.commitHash")} mix={newFormBuild("field")}>
        <Input
          name="hash"
          placeholder="66e50bf"
          clearButton
          register={register}
          setValue={setValue}
          mix={newFormBuild("input")}
        />
      </FormField>
      <FormField title={t("newBuildForm.branch")} mix={newFormBuild("field")}>
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
        <Button type="submit" text={t("newBuildForm.runBuild")} view="accent" size="m" mix={newFormBuild("button")} />
        <Button text={t("newBuildForm.cancel")} size="m" mix={newFormBuild("button")} onClick={onCancel} />
      </div>
    </Form>
  );
};
export default NewBuildForm;

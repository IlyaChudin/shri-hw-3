import React, { useState } from "react";
import Form from "../Form";
import FormField from "../FormField";
import Input from "../Input";
import Button from "../Button/Button";
import cn from "../../classname";

function NewBuildForm(props) {
  const { onSubmit, onCancel, error } = props;
  const [hash, setHash] = useState("");
  const newFormBuild = cn("new-build-form");
  const submitHandler = () => {
    onSubmit && onSubmit({ hash });
  };
  return (
    <Form title="New build" mix={newFormBuild()}>
      <FormField title="Enter the commit hash which you want to build." type="v" mix={newFormBuild("field")}>
        <Input
          placeholder="Commit hash"
          value={hash}
          error={error}
          onChange={setHash}
          clearButton
          size="m"
          mix={newFormBuild("input")}
        />
      </FormField>
      <div className={newFormBuild("buttons")}>
        <Button text="Run build" view="accent" size="m" mix={newFormBuild("button")} onClick={submitHandler} />
        <Button text="Cancel" size="m" mix={newFormBuild("button")} onClick={onCancel} />
      </div>
    </Form>
  );
}
export default NewBuildForm;

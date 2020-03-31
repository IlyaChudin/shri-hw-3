import React, { useState } from "react";
import Form from "../Form";
import FormField from "../FormField";
import Input from "../Input";
import Button from "../Button/Button";
import cn from "../../classname";

function NewBuildForm(props) {
  const { onSubmit, onCancel, error } = props;
  const [hash, setHash] = useState("");
  const [branch, setBranch] = useState("");
  const newFormBuild = cn("new-build-form");
  const submitHandler = () => {
    onSubmit && onSubmit({ hash, branch });
  };
  return (
    <Form title="New build" mix={newFormBuild()} error={error}>
      <FormField title="Commit hash" type="v" mix={newFormBuild("field")}>
        <Input placeholder="66e50bf" value={hash} onChange={setHash} clearButton size="m" mix={newFormBuild("input")} />
      </FormField>
      <FormField title="Branch" type="v" mix={newFormBuild("field")}>
        <Input
          placeholder="master"
          value={branch}
          onChange={setBranch}
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

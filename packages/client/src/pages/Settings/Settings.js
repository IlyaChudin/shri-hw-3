import React, { useEffect } from "react";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import cn from "../../classname";
import Header from "../../components/Header";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { clearSaveError, saveSettings } from "../../store/settings/actions";

const settings = cn("settings");
const required = { required: { value: true, message: "This field is required" } };

function Settings({ appName }) {
  const { register, errors, setValue, control, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector(x => x.settings);

  useEffect(() => {
    document.title = `Settings - ${appName}`;
  }, [appName]);

  useEffect(() => {
    return () => {
      if (store.saveError) {
        dispatch(clearSaveError());
      }
    };
  }, [store.saveError, dispatch]);

  // hack MaskedInput.defaultValue not working
  useEffect(() => setValue("period", store.period), [store.period, setValue]);

  const onSubmit = data => {
    if (!errors.repoName && !errors.buildCommand) {
      dispatch(saveSettings({ ...data, period: Number(data.period) }, history));
    }
  };

  return (
    <>
      <Header title={appName} />
      <Layout isPageContent mix={settings()} containerMix={settings("content")}>
        <Form
          title="Settings"
          description="Configure repository connection and synchronization settings."
          onSubmit={handleSubmit(onSubmit)}
          mix={settings("form")}
          error={store.saveError}
        >
          <FormField title="GitHub repository" required type="v" mix={settings("field")}>
            <Input
              name="repoName"
              initialValue={store.repoName}
              placeholder="user-name/repo-name"
              size="m"
              clearButton
              register={register(required)}
              setValue={setValue}
              error={errors.repoName && errors.repoName.message}
              mix={settings("input")}
            />
          </FormField>
          <FormField title="Build command" required type="v" mix={settings("field")}>
            <Input
              name="buildCommand"
              initialValue={store.buildCommand}
              placeholder="npm ci && npm run build"
              size="m"
              clearButton
              register={register(required)}
              setValue={setValue}
              error={errors.buildCommand && errors.buildCommand.message}
              mix={settings("input")}
            />
          </FormField>
          <FormField title="Main branch" type="v" mix={settings("field")}>
            <Input
              name="mainBranch"
              initialValue={store.mainBranch}
              placeholder="master"
              size="m"
              clearButton
              register={register}
              setValue={setValue}
              mix={settings("input")}
            />
          </FormField>
          <FormField title="Synchronize every" type="h" addon="minutes" mix={settings("field")}>
            <div className={cn("input")()}>
              <Controller
                as={MaskedInput}
                control={control}
                name="period"
                className={classnames(
                  cn("input")("control", { size: "m", "text-align": "right" }),
                  settings("input", { size: "small" })
                )}
                guide={false}
                defaultValue="123"
                mask={[/\d/, /\d/, /\d/]}
                placeholder="10"
              />
            </div>
          </FormField>
          <div className={settings("buttons")}>
            <Button
              disabled={store.isSaving}
              type="submit"
              text="Save"
              view="accent"
              size="m"
              mix={settings("button")}
            />
            <Button
              disabled={store.isSaving}
              text="Cancel"
              size="m"
              mix={settings("button")}
              onClick={() => history.goBack()}
            />
          </div>
        </Form>
      </Layout>
    </>
  );
}

export default Settings;

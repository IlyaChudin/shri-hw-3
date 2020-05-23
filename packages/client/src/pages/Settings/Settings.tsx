import React, { useEffect } from "react";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";
import { useHistory } from "react-router-dom";
import { Controller, FieldError, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import cn from "../../classname";
import Header from "../../components/Header";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { clearSaveError, saveSettings } from "../../store/settings/actions";
import { RootState } from "../../store";
import { SettingsState } from "../../store/settings/types";

const settings = cn("settings");

interface SettingsFormData {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: string;
}

const getError = (e: FieldError | undefined, t: TFunction): string | undefined => {
  if (e) {
    if (e.type === "required") {
      return t("settingsPage.required");
    }
    if (typeof e.message === "string") {
      return e.message;
    }
  }
  return undefined;
};

const Settings: React.FC = () => {
  const { register, errors, setValue, control, handleSubmit, watch } = useForm<SettingsFormData>();
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector<RootState, SettingsState>(x => x.settings);
  const { t } = useTranslation();
  const appName = t("appName");
  const title = t("settingsPage.title");
  const period = watch("period");

  useEffect(() => {
    document.title = `${title} - ${appName}`;
  }, [appName, title]);

  useEffect(() => {
    return (): void => {
      if (store.saveError) {
        dispatch(clearSaveError());
      }
    };
  }, [store.saveError, dispatch]);

  // hack MaskedInput.defaultValue not working
  useEffect(() => {
    return setValue("period", String(store.period));
  }, [store.period, setValue]);

  const onSubmit = (data: SettingsFormData): void => {
    if (!errors.repoName && !errors.buildCommand) {
      dispatch(saveSettings({ ...data, period: Number(data.period) }, history));
    }
  };

  const onCancel = (): void => {
    history.goBack();
  };

  return (
    <>
      <Header title={appName} />
      <Layout isPageContent mix={settings()} containerMix={settings("content")}>
        <Form
          title={title}
          description={t("settingsPage.description")}
          onSubmit={handleSubmit(onSubmit)}
          mix={settings("form")}
          error={store.saveError}
        >
          <FormField title={t("settingsPage.repository")} required mix={settings("field")}>
            <Input
              name="repoName"
              initialValue={store.repoName}
              placeholder="user-name/repo-name"
              clearButton
              register={register({ required: true })}
              setValue={setValue}
              error={getError(errors.repoName, t)}
              mix={settings("input")}
            />
          </FormField>
          <FormField title={t("settingsPage.buildCommand")} required mix={settings("field")}>
            <Input
              name="buildCommand"
              initialValue={store.buildCommand}
              placeholder="npm ci && npm run build"
              clearButton
              register={register({ required: true })}
              setValue={setValue}
              error={getError(errors.buildCommand, t)}
              mix={settings("input")}
            />
          </FormField>
          <FormField title={t("settingsPage.mainBranch")} mix={settings("field")}>
            <Input
              name="mainBranch"
              initialValue={store.mainBranch}
              placeholder="master"
              clearButton
              register={register}
              setValue={setValue}
              mix={settings("input")}
            />
          </FormField>
          <FormField
            title={t("settingsPage.synchronizeEvery", { count: Number(period) })}
            type="h"
            addon={t("settingsPage.period", { count: Number(period) })}
            mix={settings("field")}
          >
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
                mask={[/\d/, /\d/, /\d/]}
                placeholder="10"
              />
            </div>
          </FormField>
          <div className={settings("buttons")}>
            <Button
              disabled={store.isSaving}
              type="submit"
              text={t("settingsPage.save")}
              view="accent"
              size="m"
              mix={settings("button")}
            />
            <Button
              disabled={store.isSaving}
              text={t("settingsPage.cancel")}
              size="m"
              mix={settings("button")}
              onClick={onCancel}
            />
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default Settings;

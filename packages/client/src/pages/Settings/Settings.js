import React, { useEffect, useState } from "react";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";
import { useHistory } from "react-router-dom";
import cn from "../../classname";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import { clearSaveError, saveSettings } from "../../store/settings/actions";

function Settings({ title }) {
  const [repoName, setRepository] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [mainBranch, setMainBranch] = useState("");
  const [period, setPeriod] = useState(0);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector(x => x.settings);

  useEffect(() => {
    setRepository(store.repoName);
    setBuildCommand(store.buildCommand);
    setMainBranch(store.mainBranch);
    setPeriod(store.period);
  }, [store.repoName, store.buildCommand, store.mainBranch, store.period]);

  useEffect(() => {
    return () => {
      if (store.saveError) {
        dispatch(clearSaveError());
      }
    };
  }, [store.saveError, dispatch]);

  const onSubmit = e => {
    setErrors({
      ...(repoName ? {} : { repoName: "This field is required" }),
      ...(buildCommand ? {} : { buildCommand: "This field is required" })
    });
    if (repoName && buildCommand) {
      dispatch(saveSettings({ repoName, buildCommand, mainBranch, period }, history));
    }
  };
  const settings = cn("settings");
  const layout = cn("layout");
  return (
    <>
      <Header title={title} />
      <div className={classnames(settings(), layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(settings("content"), layout("container", { size: "s" }))}>
          <Form
            title="Settings"
            description="Configure repository connection and synchronization settings."
            mix={settings("form")}
            error={store.saveError}
          >
            <FormField title="GitHub repository" required={true} type="v" mix={settings("field")}>
              <Input
                placeholder="user-name/repo-name"
                clearButton={true}
                error={errors && errors.repoName}
                size="m"
                mix={settings("input")}
                value={repoName}
                onChange={setRepository}
              />
            </FormField>
            <FormField title="Build command" required={true} type="v" mix={settings("field")}>
              <Input
                placeholder="npm ci && npm run build"
                clearButton={true}
                error={errors && errors.buildCommand}
                size="m"
                mix={settings("input")}
                value={buildCommand}
                onChange={setBuildCommand}
              />
            </FormField>
            <FormField title="Main branch" type="v" mix={settings("field")}>
              <Input
                placeholder="master"
                clearButton={true}
                size="m"
                mix={settings("input")}
                value={mainBranch}
                onChange={setMainBranch}
              />
            </FormField>
            <FormField title="Synchronize every" type="h" addon="minutes" mix={settings("field")}>
              <div className={cn("input")()}>
                <MaskedInput
                  className={classnames(
                    cn("input")("control", { size: "m", "text-align": "right" }),
                    settings("input", { size: "small" })
                  )}
                  guide={false}
                  mask={[/\d/, /\d/, /\d/]}
                  placeholder="10"
                  value={period}
                  onChange={e => setPeriod(Number(e.target.value))}
                />
              </div>
            </FormField>
            <div className={settings("buttons")}>
              <Button
                disabled={store.isSaving}
                text="Save"
                view="accent"
                size="m"
                mix={settings("button")}
                onClick={onSubmit}
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings;

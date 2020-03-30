import React, { useState } from "react";
import { classnames } from "@bem-react/classnames";
import MaskedInput from "react-text-mask";
import cn from "../../classname";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";

function Settings() {
  const [repository, setRepository] = useState("");
  const [command, setCommand] = useState("");
  const [branch, setBranch] = useState("");
  const [period, setPeriod] = useState("");
  const settings = cn("settings");
  const layout = cn("layout");
  return (
    <>
      <Header title="School CI server" />
      <div className={classnames(settings(), layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(settings("content"), layout("container", { size: "s" }))}>
          <Form
            title="Settings"
            description="Configure repository connection and synchronization settings."
            mix={settings("form")}
          >
            <FormField title="GitHub repository" required={true} type="v" mix={settings("field")}>
              <Input
                placeholder="user-name/repo-name"
                clearButton={true}
                size="m"
                mix={settings("input")}
                value={repository}
                onChange={setRepository}
              />
            </FormField>
            <FormField title="Build command" required={true} type="v" mix={settings("field")}>
              <Input
                placeholder="npm ci && npm run build"
                clearButton={true}
                size="m"
                mix={settings("input")}
                value={command}
                onChange={setCommand}
              />
            </FormField>
            <FormField title="Main branch" type="v" mix={settings("field")}>
              <Input
                placeholder="master"
                clearButton={true}
                size="m"
                mix={settings("input")}
                value={branch}
                onChange={setBranch}
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
                  onChange={e => setPeriod(e.target.value)}
                />
              </div>
            </FormField>
            <div className={settings("buttons")}>
              <Button text="Save" view="accent" size="m" mix={settings("button")} />
              <Button href="/" text="Cancel" size="m" mix={settings("button")} />
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings;

import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const layout = cn("layout");
const pageContent = cn("page")("content");

function Layout(props) {
  const { mix, containerMix, horizontalIndent = "s", containerSize = "s", isPageContent = false, children } = props;

  return (
    <div className={classnames(layout({ "space-h": horizontalIndent }), isPageContent && pageContent, mix)}>
      <div className={classnames(layout("container", { size: containerSize }), containerMix)}>{children}</div>
    </div>
  );
}

export default Layout;

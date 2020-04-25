import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const layout = cn("layout");
const pageContent = cn("page")("content");

interface LayoutProps {
  mix?: string;
  containerMix?: string;
  horizontalIndent?: string;
  containerSize?: string;
  isPageContent?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  mix,
  containerMix,
  horizontalIndent = "s",
  containerSize = "s",
  isPageContent = false,
  children
}) => {
  return (
    <div className={classnames(layout({ "space-h": horizontalIndent }), isPageContent ? pageContent : undefined, mix)}>
      <div className={classnames(layout("container", { size: containerSize }), containerMix)}>{children}</div>
    </div>
  );
};

export default Layout;

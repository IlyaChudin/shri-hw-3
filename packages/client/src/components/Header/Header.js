import React from "react";
import Button from "../Button";
import cn from "../../classname";

function Header(props) {
  const { buttons, title, titleColor } = props;
  return (
    <div className="header layout layout_space-h_s">
      <div className="header__content layout__container layout__container_size_s">
        <div className={cn("header", "title")({ color: titleColor })}>{title}</div>
        {buttons && (
          <div className="header__actions">
            {buttons.map(({ id, ...buttonProps }) => (
              <Button key={id} {...buttonProps} mixes={["header__button"]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

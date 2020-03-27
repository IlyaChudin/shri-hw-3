import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    href: "#",
    text: "Support"
  },
  {
    href: "#",
    text: "Learning"
  }
];

function Footer() {
  return (
    <div className="footer layout layout_space-h_s">
      <div className="footer__content layout__container layout__container_size_s">
        <div className="footer__menu">
          {links.map(({ href, text }, i) => (
            <Link key={i} to={href} className="footer__link">
              {text}
            </Link>
          ))}
        </div>
        <span className="footer__copyright">© 2020 Ilya Chudin</span>
      </div>
    </div>
  );
}

export default Footer;

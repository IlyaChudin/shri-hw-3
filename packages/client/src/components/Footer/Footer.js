import React from "react";
import { Link } from "react-router-dom";
import cn from "../../classname";
import Layout from "../Layout";

const footer = cn("footer");

function Footer() {
  return (
    <Layout mix={footer()} containerMix={footer("content")}>
      <div className={footer("menu")}>
        <Link to="#" className={footer("link")}>
          Support
        </Link>
        <Link to="#" className={footer("link")}>
          Learning
        </Link>
      </div>
      <span className={footer("copyright")}>&copy; 2020 Ilya Chudin</span>
    </Layout>
  );
}

export default Footer;

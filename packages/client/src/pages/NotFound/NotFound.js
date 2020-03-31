import React from "react";
import { Link } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import cn from "../../classname";

function NotFound({ title }) {
  const layout = cn("layout");
  return (
    <>
      <Header title={title} />
      <div className={classnames(layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(layout("container", { size: "s" }))}>
          <h3>Page not found</h3>
          <Link to="/">Go home</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;

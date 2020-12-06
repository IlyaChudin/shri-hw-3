import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "../../classname";
import Layout from "../Layout";

const footer = cn("footer");

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (): void => {
    i18n.changeLanguage(i18n.languages[0] === "en" ? "ru" : "en");
  };

  return (
    <Layout mix={footer()} containerMix={footer("content")}>
      <div className={footer("menu")}>
        <Link to="#" className={footer("link")}>
          {t("footer.support")}
        </Link>
        <Link to="#" className={footer("link")}>
          {t("footer.learning")}
        </Link>
        <div className={footer("link")} onClick={changeLang}>
          {t("footer.lang")}
        </div>
      </div>
      <span className={footer("copyright")}>&copy; 2020 {t("footer.author")}</span>
    </Layout>
  );
};

export default Footer;

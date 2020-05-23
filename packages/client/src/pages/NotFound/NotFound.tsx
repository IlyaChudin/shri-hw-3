import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const appName = t("appName");
  const notFound = t("notFoundPage.title");

  useEffect(() => {
    document.title = `${notFound} - ${appName}`;
  }, [appName, notFound]);

  return (
    <>
      <Header title={appName} />
      <Layout isPageContent>
        <h3>{notFound}</h3>
        <Link to="/">{t("notFoundPage.goHome")}</Link>
      </Layout>
    </>
  );
};

export default NotFound;

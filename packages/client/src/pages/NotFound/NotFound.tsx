import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const appName = t("appName");

  useEffect(() => {
    document.title = `Not found - ${appName}`;
  }, [appName]);

  return (
    <>
      <Header title={appName} />
      <Layout isPageContent>
        <h3>Page not found</h3>
        <Link to="/">Go home</Link>
      </Layout>
    </>
  );
};

export default NotFound;

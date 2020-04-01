import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";

function NotFound({ title }) {
  return (
    <>
      <Header title={title} />
      <Layout isPageContent>
        <h3>Page not found</h3>
        <Link to="/">Go home</Link>
      </Layout>
      <Footer />
    </>
  );
}

export default NotFound;

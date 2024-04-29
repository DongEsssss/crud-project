import { Outlet } from "react-router-dom";
import Header from "./frame/Header/Header";
import Footer from "./frame/Footer/Footer";
import { useTranslation } from "react-i18next";
import './styles/global.scss'

const Main = () => {
  document.title = useTranslation().t("CRUD")
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Main;

import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./DefaultLayouts.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function DefaultLayouts({ children }) {
  const [activeSidebar,setActiveSidebar] = useState(false);
  return (
    <>
      <div className="">
        <Header />
        <div className="container text-base">
            <Sidebar setActiveSidebar = {setActiveSidebar} activeSidebar = {activeSidebar}/>
            <div className={!activeSidebar?"wrapper":"wrapper wp_open"}>
            <div>{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayouts;

import Footer from "components/global/Footer";
import React from "react";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";
import Sec4 from "./components/Sec4";
import Sec5 from "./components/Sec5";
import Sec6 from "./components/Sec6";
import Sec7 from "./components/Sec7";
import Sec8 from "./components/Sec8";
import Sect3 from "./components/Sec3";
import Nav from "components/global/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <Sec1 />
      <Sec2 />
      <Sect3 />
      <Sec4/>
      <Sec5 />
      <Sec6 />
      <Sec7 />
      <Sec8 />
      <Footer />
    </>
  );
};

export default Home;

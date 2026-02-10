import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppTheme from "../theme/AppTheme";
import AppAppBar from "../components/page_principle/AppAppBar";
import Hero from "../components/page_principle/Hero";
import Highlights from "../components/page_principle/Highlights";
import Pricing from "../components/page_principle/Pricing";
import Features from "../components/page_principle/Features";
import React from "react";
import Footer from "../components/page_principle/Footer"
import AOS from "aos";
import "aos/dist/aos.css";
export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
        <AppAppBar />
          <Hero />
      <div>
        <div data-aos="zoom-in-up">
          <Features />
          <Divider />
        </div>
        <div data-aos="fade-up">
          <Highlights />
          <Divider />
        </div>
        <div data-aos="zoom-in-up">
          <Pricing />
        </div>
         <div data-aos="zoom-in-down">
          <Footer /> 

        </div>
      </div>
    </AppTheme>
  );
}

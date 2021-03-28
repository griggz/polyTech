import withRoot from "../components/prebuilt/withRoot";
import { withRouter } from "next/router";
// --- Post bootstrap -----
import React, { useState, useRef } from "react";
import ProductAbout from "../components/views/ProductAbout";
import ProductSmokingHero from "../components/views/ProductSmokingHero";
import AppFooter from "../components/views/AppFooter";
import ProductHero from "../components/views/ProductHero";
import ProductValues from "../components/views/ProductValues";
import ProductHowItWorks from "../components/views/ProductHowItWorks";
import ProductCTA from "../components/views/ProductCTA";
import AppAppBar from "../components/views/AppAppBar";
import Snackbar from "../components/prebuilt/Snackbar";

const scrollToRef = (ref) =>
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

function Index(props) {
  const valuesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const { snackMessage, snackOpen } = props.router.query;
  const [notification, setNotification] = useState(snackOpen || false);
  const handleClickValues = () => scrollToRef(valuesRef);
  const handleClickAbout = () => scrollToRef(aboutRef);
  const handleClickContact = () => scrollToRef(contactRef);
  // notification
  const handleNotification = () => setNotification(false);

  return (
    <React.Fragment>
      <AppAppBar
        handleClick={{
          values: handleClickValues,
          about: handleClickAbout,
          contact: handleClickContact,
        }}
      />
      <ProductHero />
      <ProductValues ref={valuesRef} />
      <ProductAbout ref={aboutRef} />
      <ProductHowItWorks ref={contactRef} />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
      <Snackbar
        open={notification}
        onClose={handleNotification}
        message={snackMessage}
      />
    </React.Fragment>
  );
}

export default withRouter(withRoot(Index));

import withRoot from '../components/prebuilt/withRoot';
// --- Post bootstrap -----
import React, {createRef, useRef} from 'react';
import ProductAbout from '../components/views/ProductAbout';
import ProductSmokingHero from '../components/views/ProductSmokingHero';
import AppFooter from '../components/views/AppFooter';
import ProductHero from '../components/views/ProductHero';
import ProductValues from '../components/views/ProductValues';
import ProductHowItWorks from '../components/views/ProductHowItWorks';
import ProductCTA from '../components/views/ProductCTA';
import AppAppBar from '../components/views/AppAppBar';

const scrollToRef = (ref) => ref.current.scrollIntoView({
  behavior: 'smooth',
  block: 'center',
});

function Index() {
  const valuesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleClickValues = () => scrollToRef(valuesRef)
  const handleClickAbout = () => scrollToRef(aboutRef)
  const handleClickContact = () => scrollToRef(contactRef)

  return (
    <React.Fragment>
      <AppAppBar handleClick={{
        values:handleClickValues,
        about:handleClickAbout,
        contact:handleClickContact
      }} />
      <ProductHero />
      <ProductValues ref={valuesRef}/>
      <ProductAbout ref={aboutRef}/>
      <ProductHowItWorks ref={contactRef} />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);

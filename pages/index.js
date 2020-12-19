import withRoot from '../components/prebuilt/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from '../components/views/ProductCategories';
import ProductSmokingHero from '../components/views/ProductSmokingHero';
import AppFooter from '../components/views/AppFooter';
import ProductHero from '../components/views/ProductHero';
import ProductValues from '../components/views/ProductValues';
import ProductHowItWorks from '../components/views/ProductHowItWorks';
import ProductCTA from '../components/views/ProductCTA';
import AppAppBar from '../components/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);

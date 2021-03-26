import React from "react";
import BaseLayout from "../../../apps/data-platform/components/views/dashboard/Dashboard";
import { withRouter } from "next/router";

import RegionalAnalysis from "../../../apps/data-platform/components/views/regional_analysis/RegionalAnalysis";

function RegionalAnalysisPage(props) {
  return (
    <BaseLayout>
      <RegionalAnalysis />
    </BaseLayout>
  );
}

export default withRouter(RegionalAnalysisPage);

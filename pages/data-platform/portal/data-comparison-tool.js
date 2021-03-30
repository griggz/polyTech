import React from "react";
import BaseLayout from "../../../apps/data-platform/components/prebuilt/BaseLayout";
import DataCompare from "../../../apps/data-platform/components/views/data_comparison_tool/DataCompare";
import { withRouter } from "next/router";

// import DataCompare from "../../../apps/data-platform/components/views/data_comparison_tool/DataCompare";

function DataComparePage() {
  return (
    <BaseLayout>
      <DataCompare />
    </BaseLayout>
  );
}

export default withRouter(DataComparePage);

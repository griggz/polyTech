import React from "react";
import BaseLayout from "../../../apps/data-platform/components/prebuilt/BaseLayout";
import { withRouter } from "next/router";
import Dashboard from "../../../apps/data-platform/components/views/dashboard/Dashboard";

function DashboardPage() {
  return (
    <BaseLayout>
      <Dashboard />
    </BaseLayout>
  );
}

export default withRouter(DashboardPage);

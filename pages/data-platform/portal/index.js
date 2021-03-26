import BaseLayout from "../../../apps/data-platform/components/prebuilt/BaseLayout";
import React from "react";
import { withRouter } from "next/router";
import Dashboard from "../../../apps/data-platform/components/views/dashboard/Dashboard";

import { useSpring, animated } from "react-spring";

function DashboardPage() {
  const { transform, opacity } = useSpring({
    from: {
      scale: 10,
      opacity: 0,
    },
    to: {
      scale: 150,
      opacity: 1,
    },
    config: {
      duration: 1000,
    },
  });

  return (
    <animated.div
      style={{
        transform,
        opacity,
      }}
    >
      <BaseLayout>
        <Dashboard />
      </BaseLayout>{" "}
    </animated.div>
  );
}

export default withRouter(DashboardPage);

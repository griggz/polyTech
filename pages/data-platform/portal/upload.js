import React from "react";
import BaseLayout from "../../../apps/data-platform/components/views/dashboard/Dashboard";
import { withRouter } from "next/router";
import UploadCsv from "../../../apps/data-platform/components/views/upload_csv/UploadCsv";

import { useSpring, animated } from "react-spring";

function UploadPage(props) {
  const { transform, opacity } = useSpring({
    from: { scale: 10, opacity: 0 },
    to: { scale: 150, opacity: 1 },
    config: { duration: 1000 },
  });
  return (
    <animated.div style={{ transform, opacity }}>
      <BaseLayout>
        <UploadCsv />
      </BaseLayout>
    </animated.div>
  );
}

export default withRouter(UploadPage);

import React from "react";
import { withRouter } from "next/router";
import BaseLayout from "../../../apps/data-platform/components/prebuilt/BaseLayout";
import UploadCsv from "../../../apps/data-platform/components/views/upload_csv/UploadCsv";

import { useSpring, animated } from "react-spring";

function UploadPage() {
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

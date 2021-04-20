import React from "react";
import BaseLayout from "../../../apps/data-platform/components/prebuilt/BaseLayout";
import { useRouter, withRouter } from "next/router";
import Dashboard from "../../../apps/data-platform/components/views/dashboard/Dashboard";
import { useSession } from "next-auth/client";

function DashboardPage() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;
  if (!loading && !session) return <p>Access Denied</p>;
  if (session && !session.user.leads && !router.query.access) {
    location.replace("/contact-us?next=/data-platorm/portal/");
  }

  return (
    <BaseLayout>
      <Dashboard />
    </BaseLayout>
  );
}

export default withRouter(DashboardPage);

import React from "react";
import { useRouter, withRouter } from "next/router";
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
    <iframe
      width="100%"
      height="1000px"
      frameBorder="0"
      className="responsive-iframe"
      src={`https://datadash.vercel.app/?token=${process.env.DATA_PLATFORM_URL_TOKEN}`}
    ></iframe>
  );
}

export default withRouter(DashboardPage);

import React from "react";
import { useRouter, withRouter } from "next/router";
import { useSession } from "next-auth/client";

function StripeForm() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;
  if (!loading && !session) return <p>Access Denied</p>;
  if (session && !session.user.leads && !router.query.access) {
    location.replace("/contact-us?next=/stripe-donate/");
  }

  return (
    <iframe
      width="100%"
      height="1000px"
      frameBorder="0"
      className="responsive-iframe"
      src={`https://stripe-donate-form.vercel.app/?token=${process.env.SRIPE_FORM_URL_TOKEN}`}
    ></iframe>
  );
}

export default withRouter(StripeForm);

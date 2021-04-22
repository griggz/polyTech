import React, { useState, useEffect } from "react";
import ContactUs from "../../components/views/ContactUs";
import { useRouter, withRouter } from "next/router";
import Snackbar from "../../components/prebuilt/Snackbar";

const leadAskMessage = [
  "Before you can access some of our demos we ask you provide",
  "some basic information about you and your interest in our services.",
];

function Contact() {
  const [notification, setNotification] = useState();
  const router = useRouter();
  // notification
  const handleNotification = () => setNotification(false);

  useEffect(() => {
    async function load() {
      if (router.asPath.includes("next=")) {
        setNotification(true);
        router.prefetch(router.asPath.split("next=")[1]);
      }
    }
    // Load
    load();
  }, []);

  return (
    <>
      <ContactUs />
      <Snackbar
        open={notification}
        onClose={handleNotification}
        message={leadAskMessage.join(" ")}
      />
    </>
  );
}

export default withRouter(Contact);

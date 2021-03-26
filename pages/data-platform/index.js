import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    async function load() {
      router.push("/data-platform/login/");
    }
    // Load
    load();
  }, []);

  return "";
}

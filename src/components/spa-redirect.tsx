"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SpaRedirect() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("p");
    if (redirect) {
      // Clean the URL and navigate
      window.history.replaceState(null, "", redirect);
      router.replace(redirect);
    }
  }, [router]);

  return null;
}

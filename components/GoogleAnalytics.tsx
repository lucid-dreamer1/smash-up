"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookieConsent } from "./CookieBanner";

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Check initial consent
    setHasConsent(getCookieConsent() === "all");

    // Listen for consent changes
    function onConsentChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      setHasConsent(detail === "all");
    }

    window.addEventListener("cookie-consent-change", onConsentChange);
    return () => window.removeEventListener("cookie-consent-change", onConsentChange);
  }, []);

  if (!hasConsent || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

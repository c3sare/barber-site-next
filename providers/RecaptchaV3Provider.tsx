"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const RecaptchaV3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY as string}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

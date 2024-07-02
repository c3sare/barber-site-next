"use client";

import { getLeftTimeToResendPasscode } from "@/actions/getLeftTimeToResendPasscode";
import { resendVerifyPasscode } from "@/actions/resendVerifyPasscode";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef, useState } from "react";

type ResendButtonPasscodeProps = {
  email: string;
};

export const ResendButtonPasscode: React.FC<ResendButtonPasscodeProps> = ({
  email,
}) => {
  const { toast } = useToast();
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [leftSecond, setLeftSecond] = useState<number | null>(null);
  const getPasscodeAction = useAction(getLeftTimeToResendPasscode, {
    onSuccess: (data) => {
      if (data.data)
        setLeftSecond(data.data);

      if (data.data !== 0) {
        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {
          setLeftSecond((prev) => {
            const result = prev! - 1;
            if (result === 0) clearInterval(interval.current!);

            return result;
          });
        }, 1000);
      }
    },
  });

  const resendPasscodeAction = useAction(resendVerifyPasscode, {
    onSuccess: (data) => {
      if (data?.data?.success) {
        getPasscodeAction.execute(email);
        toast({
          title: "Success",
          description: "New passcode has been sent to your email",
        });
      }
    },
  });

  const isLoading =
    getPasscodeAction.status === "executing" ||
    resendPasscodeAction.status === "executing";

  useEffect(() => {
    getPasscodeAction.execute(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const className =
    "disabled:opacity-50 hover:disabled:opacity-50 hover:opacity-80 hover:disabled:no-underline hover:underline";

  if (isLoading || leftSecond === null)
    return (
      <button disabled className={className}>
        Resend passcode
      </button>
    );

  return (
    <button
      disabled={leftSecond > 0}
      type="button"
      className={className}
      onClick={() => resendPasscodeAction.execute(email)}
    >
      Resend passcode{leftSecond === 0 ? "" : ` (${leftSecond}s)`}
    </button>
  );
};

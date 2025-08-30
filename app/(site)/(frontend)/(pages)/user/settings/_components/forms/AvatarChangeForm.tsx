"use client";

import { FileUpIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { updateUserAvatar } from "@/actions/updateUserAvatar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/components/ui/use-toast";

const AvatarChangeForm = () => {
  const { toast } = useToast();
  const { update, data } = useSession();
  const action = useAction(updateUserAvatar, {
    onSettled: (data) => {
      if (data?.result?.data?.success) {
        toast({ title: "Success", description: "Avatar was updated" });
        update();
      } else toast({ title: "Error", description: "Something went wrong" });
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const inputOnChange = () => {
    formRef!.current!.requestSubmit();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    action.execute(formData);
  };

  const isLoading = action.status === "executing";

  return (
    <form className="w-[128px] h-[128px]" ref={formRef} onSubmit={onSubmit}>
      <label
        htmlFor="avatar"
        className={cn(
          "relative group w-[128px] h-[128px] cursor-pointer",
          isLoading && "opacity-50 cursor-default"
        )}
      >
        <Image
          src={data?.user?.image ?? "/images/avatar.png"}
          alt="Avatar"
          width={128}
          height={128}
        />
        <input
          type="file"
          className="hidden"
          id="avatar"
          name="image"
          accept="image/png, image/jpeg, image/webp, image/jpg"
          onChange={inputOnChange}
          disabled={isLoading}
        />
        {!isLoading && (
          <div className="opacity-0 text-white absolute top-0 left-0 h-full w-full bg-[rgba(0,_0,_0,_.6)] group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <FileUpIcon width={24} height={24} />
            <span className="sr-only">Change avatar</span>
          </div>
        )}
      </label>
    </form>
  );
};

export default AvatarChangeForm;

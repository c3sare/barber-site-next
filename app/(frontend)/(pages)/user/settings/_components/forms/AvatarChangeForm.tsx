"use client";

import { FileUpIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import updateAvatar from "../../_actions/updateAvatar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const AvatarChangeForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { update, data } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const inputOnChange = () => {
    formRef!.current!.requestSubmit();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    updateAvatar(formData)
      .then(() => {
        update();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="w-[256px] h-[256px]" ref={formRef} onSubmit={onSubmit}>
      <label
        htmlFor="avatar"
        className={cn(
          "relative group w-[256px] h-[256px] cursor-pointer",
          isLoading && "opacity-50 cursor-default"
        )}
      >
        <Image
          src={data?.user?.image ?? "/images/avatar.png"}
          alt="Avatar"
          width={256}
          height={256}
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
            <FileUpIcon width={48} height={48} />
          </div>
        )}
      </label>
    </form>
  );
};

export default AvatarChangeForm;

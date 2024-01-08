"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FileUpIcon } from "lucide-react";
import Image from "next/image";
import { InputHTMLAttributes, useRef } from "react";
import updateAvatar from "../../_actions/updateAvatar";

const AvatarChangeForm = () => {
  const user = useCurrentUser();
  const formRef = useRef<HTMLFormElement>(null);

  const inputOnChange = (e: InputHTMLAttributes<HTMLInputElement>) => {
    formRef!.current!.requestSubmit();
  };

  return (
    <form className="w-[100px] h-[100px]" ref={formRef} action={updateAvatar}>
      <label
        htmlFor="avatar"
        className="relative group w-[100px] h-[100px] cursor-pointer"
      >
        <Image
          src={user?.image ?? "/images/avatar.png"}
          alt="Avatar"
          width={100}
          height={100}
        />
        <input
          type="file"
          className="hidden"
          id="avatar"
          name="image"
          onChange={inputOnChange}
        />
        <div className="opacity-0 text-white absolute top-0 left-0 h-full w-full bg-[rgba(0,_0,_0,_.8)] group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <FileUpIcon />
        </div>
      </label>
    </form>
  );
};

export default AvatarChangeForm;

import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { GoogleLogin } from "./actions/GoogleLogin";
import { GithubLogin } from "./actions/GithubLogin";
import { TransitionStartFunction } from "react";

type Props = { disabled?: boolean; startTransition: TransitionStartFunction };

const AlternativeLoginOptions = ({ disabled, startTransition }: Props) => {
  return (
    <>
      <div className="w-full my-4 mx-4 relative text-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-[calc(100%_-_16px)] before:h-[1px] before:bg-black max-w-[300px]">
        <span className="bg-white relative px-3 text-sm">or continue with</span>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm w-full max-w-[300px] flex-wrap">
        <button
          disabled={disabled}
          type="button"
          className="w-[140px] h-[40px] flex items-center gap-2 rounded-sm text-white bg-[#d62d20] font-bold py-2 px-8 hover:opacity-90 transition-opacity disabled:opacity-70"
          onClick={() => startTransition(async () => await GoogleLogin())}
        >
          <GoogleIcon width={16} height={16} />
          <span>Google</span>
        </button>
        <button
          disabled={disabled}
          type="button"
          onClick={() => startTransition(async () => await GithubLogin())}
          className="w-[140px] h-[40px] flex items-center gap-2 rounded-sm text-white bg-[#0d1117] font-bold py-2 px-8 hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          <GithubIcon width={16} height={16} />
          <span>GitHub</span>
        </button>
      </div>
    </>
  );
};

export default AlternativeLoginOptions;

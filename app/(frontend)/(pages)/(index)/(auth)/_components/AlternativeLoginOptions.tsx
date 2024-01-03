import { signIn } from "@/auth";
import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { GoogleLogin } from "./actions/GoogleLogin";

const AlternativeLoginOptions = () => {
  return (
    <>
      <div className="w-full my-4 relative text-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-full before:h-[1px] before:bg-black max-w-[300px]">
        <span className="bg-white relative px-3 text-sm">Or continue with</span>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 rounded-sm text-white bg-[#d62d20] font-bold py-2 px-8 hover:opacity-90 transition-opacity"
          onClick={async () => await GoogleLogin()}
        >
          <GoogleIcon width={16} height={16} />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-sm text-white bg-[#0d1117] font-bold py-2 px-8 hover:opacity-90 transition-opacity"
        >
          <GithubIcon width={16} height={16} />
          <span>GitHub</span>
        </button>
      </div>
    </>
  );
};

export default AlternativeLoginOptions;

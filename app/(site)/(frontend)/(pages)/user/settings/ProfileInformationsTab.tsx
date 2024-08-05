import AvatarChangeForm from "./_components/forms/AvatarChangeForm";
import ProfileInformationsForm from "./_components/forms/ProfileInformationsForm";
import { getCurrentUserProfileInformations } from "@/actions/getProfileInformation";

export const ProfileInformationsTab = async () => {
  const profileInformations = await getCurrentUserProfileInformations();

  return (
    <div className="flex gap-6 items-center justify-center flex-wrap md:flex-nowrap">
      <AvatarChangeForm />
      <ProfileInformationsForm profileInformations={profileInformations} />
    </div>
  );
};

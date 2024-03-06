import { db } from "@/lib/db";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import { RemindPasswordForm } from "./_components/RemindPasswordForm";
import { notFound } from "next/navigation";

type RemindPasswordPageProps = {
  searchParams: {
    id?: string;
    token?: string;
  };
};

export default async function RemindPasswordPage({
  searchParams: { id, token },
}: RemindPasswordPageProps) {
  if (id && token) {
    const user = await db.user.findUnique({
      where: {
        id,
        changePasswordToken: token,
      },
    });

    if (!user) return notFound();

    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
        <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
          Change Password
        </h1>
        <ChangePasswordForm userId={id} token={token} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
      <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
        Remind Password
      </h1>
      <RemindPasswordForm />
    </div>
  );
}

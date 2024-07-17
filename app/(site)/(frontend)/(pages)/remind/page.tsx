import db from "@/lib/drizzle";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import { RemindPasswordForm } from "./_components/RemindPasswordForm";
import { notFound } from "next/navigation";
import { Typography } from "@/components/typography";

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
    const user = await db.query.user.findFirst({
      where: (user, { eq, and }) =>
        and(eq(user.id, id), eq(user.changePasswordToken, token)),
    });

    if (!user) return notFound();

    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
        <Typography
          tag="h1"
          className="text-4xl after:left-1/2 after:-translate-x-1/2"
        >
          Change Password
        </Typography>
        <ChangePasswordForm userId={id} token={token} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
      <Typography
        tag="h1"
        className="text-4xl after:left-1/2 after:-translate-x-1/2"
      >
        Remind Password
      </Typography>
      <RemindPasswordForm />
    </div>
  );
}

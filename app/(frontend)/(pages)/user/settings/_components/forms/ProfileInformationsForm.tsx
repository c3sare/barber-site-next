"use client";

import { updateProfileInformation } from "@/actions/updateProfileInformation";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { profileInformationsSchema } from "@/validators/profileInformationsSchema";
import { useAction } from "next-safe-action/hooks";

type ProfileInformationsFormProps = {
  profileInformations: {
    name: string;
    email: string;
    phone: string;
  };
};

const ProfileInformationsForm: React.FC<ProfileInformationsFormProps> = ({
  profileInformations,
}) => {
  const { toast } = useToast();
  const action = useAction(updateProfileInformation, {
    onSettled: (data) => {
      if (data.data?.success)
        toast({
          title: "Success",
          description: "Profile informations updated",
        });
      else
        toast({
          title: "Error",
          description: "Something went wrong",
        });
    },
  });

  const isLoading = action.status === "executing";

  const form = useZodForm({
    schema: profileInformationsSchema,
    defaultValues: profileInformations,
    disabled: isLoading,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute(data);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <FormInput control={form.control} name="name" label="Name" />
        <FormInput control={form.control} name="phone" label="Phone" />
        <FormInput control={form.control} name="email" label="E-mail" />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileInformationsForm;

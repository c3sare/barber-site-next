import { useToast } from "@/components/ui/use-toast";
import { SafeAction } from "next-safe-action";
import {
  HookCallbacks,
  useAction as useActionLibrary,
} from "next-safe-action/hooks";
import { Schema } from "zod";

export const useAction = <S extends Schema, const Data>(
  action: SafeAction<S, Data>,
  callbacks?: HookCallbacks<S, Data>
) => {
  const { toast } = useToast();

  return useActionLibrary(action, {
    ...callbacks,
    onError:
      callbacks?.onError ||
      function (data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.serverError,
        });
      },
  });
};

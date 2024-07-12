"use client";

import { savePageContent } from "@/actions/admin/pages/savePageContent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEditor } from "@craftjs/core";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";

export const SavePageButton = () => {
  const { id } = useParams<{ id: string }>();
  const { query } = useEditor();
  const { toast } = useToast();
  const action = useAction(savePageContent, {
    onSuccess: () => {
      toast({
        title: "Action",
        description: "Page saved",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
  });

  return (
    <Button
      size="sm"
      disabled={action.isExecuting}
      onClick={() =>
        action.execute({ id: parseInt(id), content: query.serialize() })
      }
    >
      Save
    </Button>
  );
};

import { savePageContent } from "@/actions/admin/pages/savePageContent";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useEditor } from "@craftjs/core";
import { Loader2Icon, Redo2Icon, Undo2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";

export const EditorTopBar = () => {
  const { toast } = useToast();
  const action = useAction(savePageContent, {
    onSuccess: () => {
      toast({
        title: "Page saved",
        description: "Your page has been saved.",
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
  const { id } = useParams<{ id: string }>();
  const { query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const isLoading = action.status === "executing";

  return (
    <div className="w-full flex items-center justify-between border-b px-2 py-1">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Undo2Icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Redo2Icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Redo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button
        size="sm"
        className="w-[150px]"
        disabled={isLoading}
        onClick={() => {
          action.execute({
            id,
            content: query.serialize(),
          });
        }}
      >
        {!isLoading ? "Save changes" : <Loader2Icon className="animate-spin" />}
      </Button>
    </div>
  );
};

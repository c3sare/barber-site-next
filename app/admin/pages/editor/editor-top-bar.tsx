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
import { useEffect, useState } from "react";

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
  const { query, actions, canRedo, canUndo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  useEffect(() => {
    const handleScroll = () => {
      actions.selectNode(undefined);
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [actions]);

  const isLoading = action.status === "executing";

  return (
    <div className="w-full flex items-center justify-between border-b px-2 py-1">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!canUndo}
                onClick={actions.history.undo}
              >
                <Undo2Icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!canRedo}
                onClick={actions.history.redo}
              >
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

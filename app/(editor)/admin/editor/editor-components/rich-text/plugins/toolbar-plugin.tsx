import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  $isElementNode,
} from "lexical";
import { BoldIcon, ItalicIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { alignItems } from "../toolbar";
import { getSelectedNode } from "../_utils/get-selected-node";
import { $isLinkNode } from "@lexical/link";
import { $findMatchingParent } from "@lexical/utils";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [align, setAlign] = useState<string | undefined>();
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      const format = selection.style;
      console.log({ format });
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const node = getSelectedNode(selection);

      let matchingParent;

      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }
      setAlign(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || "left"
      );
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <Card className="p-2">
      <ToggleGroup variant="outline" type="single" size="sm" value={align}>
        <Toggle
          size="sm"
          variant="outline"
          pressed={isBold}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <BoldIcon className="size-3" />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          pressed={isItalic}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <ItalicIcon className="size-3" />
        </Toggle>
        <Separator className="h-8 mx-0.5" orientation="vertical" />
        {alignItems.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, item.value)
            }
          >
            <item.icon className="size-3" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNode } from "@craftjs/core";

type Props = {
  title: string;
  object_key: string;
  placeholder?: string;
};

export const TextareaInput = ({ title, object_key, placeholder }: Props) => {
  const {
    actions: { setProp },
    text,
  } = useNode((node) => ({
    text: node.data.props[object_key],
  }));

  return (
    <Card className="p-2">
      <Label>
        {title}
        <Textarea
          value={text}
          className="resize-y"
          placeholder={placeholder}
          onChange={(e) =>
            setProp((prop: { text: string }) => (prop.text = e.target.value))
          }
        />
      </Label>
    </Card>
  );
};

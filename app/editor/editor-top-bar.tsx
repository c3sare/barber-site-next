import { savePageContent } from "@/actions/admin/pages/savePageContent";
import { useEditor } from "@craftjs/core";
import { useParams } from "next/navigation";

export const EditorTopBar = () => {
  const { id } = useParams<{ id: string }>();
  const { query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="h-[40px] w-full flex items-center justify-between">
      <button onClick={() => console.log(query.serialize())}>compress</button>
      <button
        onClick={async () => {
          const result = await savePageContent({
            id,
            content: query.serialize(),
          });
          console.log(result);
        }}
      >
        save
      </button>
    </div>
  );
};

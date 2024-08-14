import { useNode } from "@craftjs/core";
import { VerticalLayoutSet } from "./vertical-layout-set";
import { HorizontalLayoutSet } from "./horizontal-layout-set";
import { GridLayoutSet } from "./grid-layout-set";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { AdvancedFlexSet } from "./advanced-flex-set";
import { AdvancedGridSet } from "./advanced-grid-set";

export const LayoutSet = () => {
  const { layout, advancedGridDisplay } = useNode((state) => ({
    layout: state.data.props?.layout,
    advancedGridDisplay: state.data.props?.advancedgriddisplay,
  }));

  switch (layout) {
    case "vertical":
      return <VerticalLayoutSet />;
    case "horizontal":
      return <HorizontalLayoutSet />;
    case "grid":
      return <GridLayoutSet />;
    case "advanced":
      return (
        <>
          <SelectToggle
            title="Display"
            object_key="advancedgriddisplay"
            withoutSizes
            options={[
              {
                value: "flex",
                title: "Flex",
                icon: <>flex</>,
              },
              {
                value: "grid",
                title: "Grid",
                icon: <>grid</>,
              },
            ]}
          />
          {advancedGridDisplay === "flex" && <AdvancedFlexSet />}
          {advancedGridDisplay === "grid" && <AdvancedGridSet />}
        </>
      );
    default:
      return null;
  }
};

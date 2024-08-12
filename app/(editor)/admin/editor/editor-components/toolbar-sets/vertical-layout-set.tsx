import { SelectToggle } from "../toolbar-elements/select-toggle";

export const VerticalLayoutSet = () => {
  return (
    <>
      <SelectToggle
        title="Align"
        object_key="vertical.align"
        options={[
          {
            title: "Left",
            value: "flex-start",
            icon: <></>,
          },
        ]}
      />
    </>
  );
};

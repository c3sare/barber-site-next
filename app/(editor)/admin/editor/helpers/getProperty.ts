export const getProperty = <T,>(
  property: string,
  value: T,
  suffix = ""
) => {
  return value ? `${property}: ${value}${suffix};` : "";
};

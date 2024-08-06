export const getProperty = <T extends unknown>(
  property: string,
  value: T,
  suffix = ""
) => {
  return value ? `${property}: ${value}${suffix};` : "";
};

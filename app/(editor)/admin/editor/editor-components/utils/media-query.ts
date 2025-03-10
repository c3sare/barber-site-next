export const mediaQuery = (maxWidth: number, content: string) =>
  content
    ? `
  @media (max-width: ${maxWidth}px) {
    ${content}
  }`
    : "";

export const bufferToBase64Url = (buffer: Buffer) => {
  return "data:image/png;base64," + buffer.toString("base64");
};

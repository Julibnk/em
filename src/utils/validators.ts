export const isUIID = (text: string) => {
  return new RegExp(
    '\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b'
  ).test(text);
};

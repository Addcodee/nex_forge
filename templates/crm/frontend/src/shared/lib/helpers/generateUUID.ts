export const generateUUID = (): string => {
  const template = "10000000-1000-4000-8000-100000000000";
  return template.replace(/[018]/g, (c) => {
    const randomByte = crypto.getRandomValues(new Uint8Array(1))[0];
    return (parseInt(c) ^ (randomByte & (15 >> (parseInt(c) / 4)))).toString(
      16
    );
  });
};

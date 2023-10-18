// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-date-now */

export const startAndEnd = (
  string_: string | undefined,
  gap: number,
): string | undefined => {
  const lngth = 30;
  const gapMin = 0;
  if (string_ && string_.length > lngth) {
    return `${string_.slice(gapMin, Math.max(0, gap))}...${string_.slice(
      string_.length - gap,
      string_.length - gap + string_.length,
    )}`;
  }
  return string_;
};

export const everyNth = (arr: any[], dayCount: any) => {
  let decimator = 5;
  if (dayCount <= 30) decimator = 15;
  else if (dayCount <= 185) decimator = 18;
  else if (dayCount <= 365) decimator = 20;
  else if (dayCount > 365) decimator = 45;
  return arr?.filter((_, index) => index % decimator == 0);
};

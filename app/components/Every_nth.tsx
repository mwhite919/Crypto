export const every_nth = (arr, dayCount) => {
  if (dayCount <= 7) {
    return arr?.filter(function (value, index, Arr) {
      return index % 5 == 0;
    });
  }
  if (dayCount <= 30) {
    return arr?.filter(function (value, index, Arr) {
      return index % 15 == 0;
    });
  }
  if (dayCount <= 365) {
    return arr?.filter(function (value, index, Arr) {
      return index % 20 == 0;
    });
  }
  if (dayCount > 365) {
    return arr?.filter(function (value, index, Arr) {
      return index % 25 == 0;
    });
  }
};

import React from "react";
import { format, parseISO } from "date-fns";
function FormattedDate(dateBeforeFormat) {
  const isoChange = parseISO(dateBeforeFormat);

  return console.log(isoChange);
}
export default FormattedDate;

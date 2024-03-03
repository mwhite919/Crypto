import React from "react";

function CharacterCounter(length: string) {
  if (length < 9) {
    return "text-lg text-center";
  }
  if (length > 9 && length < 18) {
    return "text-md text-center";
  }
  if (length >= 19) {
    return "text-sm text-center";
  }
}

export default CharacterCounter;

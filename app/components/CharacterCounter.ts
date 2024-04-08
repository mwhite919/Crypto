function CharacterCounter(length: number) {
  if (length < 9) {
    return "text-center text-lg ";
  }
  if (length > 9 && length < 18) {
    return "text-center";
  }
  if (length >= 18) {
    return "text-center text-sm";
  }
}

export default CharacterCounter;

export function checkForOptionDups(optionList) {
  const uniqueOptions = [];
  let dups = false;
  optionList.forEach((option) => {
    if (uniqueOptions.indexOf(option.optionName) == -1) {
      uniqueOptions.push(option.optionName);
    } else {
      dups = true;
      return;
    }
  });

  return dups;
}

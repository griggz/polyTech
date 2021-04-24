// Uppercases the first letter of a string
export function UpperFirstLetter(string) {
  // Utility function for upper casing first letters (ex. virginia => Virginia)
  if (typeof string === undefined) return "Undefined";
  if (string.split("_")[1] === "dc") {
    const firstWord = string.split("_")[0];
    const secondWord = string.split("_")[1];

    return (
      firstWord[0].toUpperCase() +
      firstWord.slice(1) +
      " " +
      secondWord.toUpperCase()
    );
  } else if (string.includes("_")) {
    const firstWord = string.split("_")[0];
    const secondWord = string.split("_")[1];

    return (
      firstWord[0].toUpperCase() +
      firstWord.slice(1) +
      " " +
      secondWord[0].toUpperCase() +
      secondWord.slice(1)
    );
  } else {
    const firstLetter = string[0];
    return firstLetter ? firstLetter.toUpperCase() + string.slice(1) : "";
  }
}
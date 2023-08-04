export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeEachWord(string: string): string {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

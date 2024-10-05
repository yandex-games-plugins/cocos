function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function capitalizeFirstWord(value: string) {
  const entries = value.split(" ");

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.length) {
      entries[i] = capitalize(entry);
      break;
    }
  }

  return entries.join(" ");
}

export function capitalizeEachWord(value: string): string {
  const entries = value.split(" ");

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.length) {
      entries[i] = capitalize(entry);
    }
  }

  return entries.join(" ");
}

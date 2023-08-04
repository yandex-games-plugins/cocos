import { L10NBundle } from "./l10n";
import { PACKAGE_NAME } from "./constants";

export type GetEndpoints = [
  {
    url: `/${typeof PACKAGE_NAME}/translations`;
    response: L10NBundle;
  }
];

export const editorServerFetch = <T extends GetEndpoints[number]["url"]>(
  url: T
): {
  [U in GetEndpoints[number] as U["url"]]: Promise<U["response"]>;
}[T] => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((v) => {
        resolve(v.json());
      })
      .catch(() => reject());
  });
};

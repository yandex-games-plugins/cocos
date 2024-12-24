import { ipc, plugin } from "@yandex-games-sdk/common";

const get = [
  {
    url: `/${plugin.name}/translations`,
    async handle(req: any, res: any, next: CallableFunction) {
      const bundle = await ipc.main.request("get-l10n-bundle");
      res.json(bundle);
    },
  },
];

export { get };

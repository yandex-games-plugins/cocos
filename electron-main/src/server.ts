import { GetEndpoints, PACKAGE_NAME, ipc } from "@common";
import { Union } from "ts-toolbelt";

type Handler<T extends GetEndpoints[number]> = {
  url: T["url"];
  handle: (
    req: Request,
    res: { json: (value: T["response"]) => void },
    next: Function
  ) => Promise<void>;
};

type GetHandlers = Union.ListOf<Handler<GetEndpoints[number]>>;

const get: GetHandlers = [
  {
    url: `/${PACKAGE_NAME}/translations`,
    async handle(req, res, next) {
      const bundle = await ipc.main.request("get-l10n-bundle");
      res.json(bundle);
    },
  },
];

export { get };

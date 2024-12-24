import { type IL10NManager, plugin } from "@yandex-games-sdk/common";
import type { ISO_639_1 } from "ysdk";

class L10NManagerWrapper {
  static instance = new L10NManagerWrapper();

  async l10nManager(): Promise<IL10NManager> {
    const l10nManager = (
      (await Editor.Module.importProjectModule(
        `db://${plugin.name}/ysdk.ts`,
      )) as any
    ).l10n as IL10NManager;
    return l10nManager;
  }

  public async reload() {
    await (await this.l10nManager()).reload();
  }

  public async changeLanguage(code: ISO_639_1) {
    await (await this.l10nManager()).changeLanguage(code);
  }

  public async getLanguage() {
    return (await this.l10nManager()).getLanguage();
  }
}

export const l10nWrapper = L10NManagerWrapper.instance;

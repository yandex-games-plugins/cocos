import { IL10NManager, LanguageCode, PACKAGE_NAME } from "@common";

class L10NManagerWrapper {
  static instance = new L10NManagerWrapper();

  async l10nManager(): Promise<IL10NManager> {
    const l10nManager = (
      (await Editor.Module.importProjectModule(
        `db://${PACKAGE_NAME}/ysdk.ts`
      )) as any
    ).l10n as IL10NManager;
    return l10nManager;
  }

  public async reload() {
    await (await this.l10nManager()).reload();
  }

  public async changeLanguage(code: LanguageCode) {
    await (await this.l10nManager()).changeLanguage(code);
  }

  public async getLanguage() {
    return (await this.l10nManager()).getLanguage();
  }
}

export const l10nWrapper = L10NManagerWrapper.instance;

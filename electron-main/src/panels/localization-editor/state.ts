import { reactive } from "vue";
import { LanguageCode } from "../../../../static/assets/common";

export type L10nData = {
  path: string;
  code: LanguageCode;
  progress?: number;
};

export const appState = reactive({
  createL10nModal: { show: false },
  previewLanguageModal: { show: false },
  l10nsData: [] as L10nData[],
  editor: {
    currentL10n: undefined as L10nData | undefined,
  },
  previewLanguage: {
    code: undefined as LanguageCode | undefined,
  },
});

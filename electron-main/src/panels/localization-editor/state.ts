import { reactive } from "vue";
import { LanguageCode } from "@common";

export type Translation = {
  path: string;
  code: LanguageCode;
  progress?: number;
};

export const appState = reactive({
  createL10nModal: { show: false },
  previewLanguageModal: { show: false },
  translations: [] as Translation[],
  editor: {
    currentTranslation: undefined as Translation | undefined,
  },
  previewLanguage: {
    code: undefined as LanguageCode | undefined,
  },
});

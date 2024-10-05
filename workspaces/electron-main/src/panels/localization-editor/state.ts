import { reactive } from "vue";
import type { ISO_639_1 } from "ysdk";

export type Translation = {
  path: string;
  code: ISO_639_1;
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
    code: undefined as ISO_639_1 | undefined,
  },
});

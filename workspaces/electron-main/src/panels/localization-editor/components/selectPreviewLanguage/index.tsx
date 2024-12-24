import {
  capitalizeFirstWord,
  ipc,
  languageName,
} from "@yandex-games-sdk/common";
import { defineComponent, ref } from "vue";
import type { ISO_639_1 } from "ysdk";

import { appState } from "../../state";
import styles from "./index.scss";

export const previewLanguageModalStyles = styles;

export const previewLanguageModal = defineComponent({
  setup() {
    const modalRef = ref<HTMLDivElement>();
    const langsSelectRef = ref<HTMLSelectElement>();

    function previewLanguage() {
      const code = langsSelectRef.value?.value as ISO_639_1;
      if (!code) return;
      appState.previewLanguage.code = code;
      appState.previewLanguageModal.show = false;
      ipc.scene.request("changeLanguage", code);
    }

    return () => (
      <>
        {appState.previewLanguageModal.show && (
          <div
            class="modal"
            ref={modalRef}
            onClick={(payload) => {
              if (payload.target === modalRef.value) {
                appState.previewLanguageModal.show = false;
              }
            }}
          >
            <div class="modal__content">
              <h1>Preview localization</h1>
              <div>
                <div>Language</div>
                <select name="languageCode" ref={langsSelectRef}>
                  {Object.values(appState.translations).map((data) => (
                    <option key={data.code} value={data.code}>
                      {`${capitalizeFirstWord(languageName(data.code))} (${data.code})`}
                    </option>
                  ))}
                </select>
              </div>
              <ui-button class="modal__button" onClick={previewLanguage}>
                Preview
              </ui-button>
            </div>
          </div>
        )}
      </>
    );
  },
});

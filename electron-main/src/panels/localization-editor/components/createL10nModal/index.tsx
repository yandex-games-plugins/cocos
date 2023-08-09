import { computed, defineComponent, ref } from "vue";
import { join } from "path";
import * as fs from "fs-extra";
import { LanguageCode, capitalizeFirstLetter, getLanguageName } from "@common";
import { appState } from "../../state";

import styles from "./index.scss";

export const createL10nModalStyles = styles;

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/"
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}

export const createL10nModal = defineComponent({
  setup() {
    const modalRef = ref<HTMLDivElement>();
    const langsSelectRef = ref<HTMLSelectElement>();
    const codes = computed<string[]>(() =>
      appState.translations.map((v) => v.code)
    );

    function createLocalization() {
      const code = langsSelectRef.value?.value;
      if (!code) return;

      const l10nPath = join(translateDataRoot, code + ".json");
      fs.lstat(l10nPath).catch((err) => {
        if (err.code !== "ENOENT") throw err; // Doesn't exists
        fs.writeFileSync(l10nPath, "{\n}");
        appState.createL10nModal.show = false;
      });
    }

    return () => (
      <>
        {appState.createL10nModal.show && (
          <div
            class="modal"
            ref={modalRef}
            onClick={(payload) => {
              if (payload.target == modalRef.value) {
                appState.createL10nModal.show = false;
              }
            }}
          >
            <div class="modal__content">
              <h1>Create new localization</h1>
              <div>
                <div>Language</div>
                <select name="languageCode" ref={langsSelectRef}>
                  {Object.values(LanguageCode)
                    .filter((c) => !codes.value.includes(c))
                    .map((code) => (
                      <option value={code}>
                        {`${capitalizeFirstLetter(
                          getLanguageName(code)
                        )} (${code})`}
                      </option>
                    ))}
                </select>
              </div>
              <ui-button class="modal__button" onClick={createLocalization}>
                Create JSON file!
              </ui-button>
            </div>
          </div>
        )}
      </>
    );
  },
});

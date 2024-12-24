import { ipc, isLanguageCode } from "@yandex-games-sdk/common";
import * as chokidar from "chokidar";
import * as fs from "fs-extra";
import { basename, join } from "path";
import { defineComponent, onMounted } from "vue";
import type { ISO_639_1 } from "ysdk";

import appStyles from "./app.scss";
import {
  createL10nModal,
  createL10nModalStyles,
} from "./components/createL10nModal";
import { l10nEditor, l10nEditorStyles } from "./components/l10nEditor";
import {
  previewLanguageModal,
  previewLanguageModalStyles,
} from "./components/selectPreviewLanguage";
import { appState } from "./state";

export const styles = "".concat(
  appStyles,
  l10nEditorStyles,
  createL10nModalStyles,
  previewLanguageModalStyles,
);

export default defineComponent({
  name: "LozalizationEditor",
  components: {
    l10nEditor,
    createL10nModal,
    previewLanguageModal,
  },
  setup() {
    onMounted(async () => {
      appState.previewLanguage.code = await ipc.scene.request("getLanguage");
    });

    return () => (
      <>
        <header class="header">
          <ui-button
            class="header__button"
            onClick={() => (appState.createL10nModal.show = true)}
          >
            <ui-icon value="add-more" />
            <ui-label>New</ui-label>
          </ui-button>

          {appState.editor.currentTranslation && (
            <>
              <ui-button
                class="header__button"
                onClick={() => window.postMessage("editor:save")}
              >
                <ui-icon value="save" />
                <ui-label>Save</ui-label>
              </ui-button>
              <ui-button
                class="header__button"
                onClick={() => window.postMessage("editor:open")}
              >
                <ui-icon value="folder" />
                <ui-label>Open</ui-label>
              </ui-button>
            </>
          )}

          {appState.editor.currentTranslation && (
            <ui-button
              class="header__button"
              onClick={() => window.postMessage("editor:reload")}
            >
              <ui-icon value="refresh" />
              <ui-label>Reload</ui-label>
            </ui-button>
          )}

          <div class="header__spacer" />

          {appState.previewLanguageModal.show || (
            <ui-button
              class="header__button"
              onClick={() => (appState.previewLanguageModal.show = true)}
            >
              <ui-icon value="font" />
              <ui-label>
                Preview: {appState.previewLanguage.code?.toUpperCase()}
              </ui-label>
            </ui-button>
          )}
        </header>
        <div class="content">
          <div class="l10nsMenu">
            {appState.translations
              .sort((a, b) => {
                if (a.code === "en") return -1;
                if (b.code === "en") return 1;
                return a.code > b.code ? 1 : -1;
              })
              .map((data) => (
                <div
                  key={data.code}
                  class={
                    appState.editor.currentTranslation === data
                      ? "l10nsMenu__item l10nsMenu__item--active"
                      : "l10nsMenu__item"
                  }
                  onClick={() => {
                    if (appState.editor.currentTranslation !== data) {
                      appState.editor.currentTranslation = data;
                    }
                  }}
                >
                  <div class="l10nsMenu__code">{data.code}</div>
                  {data.progress && (
                    <div class="l10nsMenu__progress">{`${Math.round(data.progress * 100)}%`}</div>
                  )}
                  {data.code !== "en" && (
                    <ui-button
                      transparent
                      class="l10nsMenu__clearButton"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        fs.removeSync(data.path);
                      }}
                    >
                      <ui-icon value="clear" />
                    </ui-button>
                  )}
                </div>
              ))}
          </div>
          <div class="l10nEditorContainer">
            <l10nEditor />
          </div>
        </div>

        {/* Modals */}
        <createL10nModal />
        <previewLanguageModal />
      </>
    );
  },
});

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/",
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}
const enJson = join(translateDataRoot, "./en.json");
if (!fs.existsSync(enJson)) {
  fs.createFileSync(enJson);
  fs.writeFileSync(enJson, "{\n}", { encoding: "utf-8" });
}

chokidar.watch(translateDataRoot).on("all", (event, path) => {
  if (!path.endsWith(".json")) return;
  const code = basename(path).split(".")[0] as ISO_639_1;
  if (!isLanguageCode(code)) return;

  switch (event) {
    case "add":
      appState.translations.push({ code, path });
      break;
    case "change":
      window.dispatchEvent(
        new CustomEvent("localization:filechange", { detail: code }),
      );
      ipc.scene.request("reload");
      break;
    case "unlink":
      appState.translations = appState.translations.filter(
        (v) => v.code !== code,
      );
      if (appState.editor.currentTranslation?.code === code) {
        appState.editor.currentTranslation = appState.translations[0];
      }
      break;
  }
});

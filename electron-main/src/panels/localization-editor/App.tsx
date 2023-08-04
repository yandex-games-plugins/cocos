import { defineComponent, onMounted } from "vue";
import * as fs from "fs-extra";
import * as chokidar from "chokidar";
import { join, basename } from "path";
import { appState } from "./state";
import { LanguageCode, ipc, isLanguageCode } from "@common";

import { l10nEditorStyles, l10nEditor } from "./components/l10nEditor";
import {
  createL10nModalStyles,
  createL10nModal,
} from "./components/createL10nModal";
import {
  previewLanguageModal,
  previewLanguageModalStyles,
} from "./components/selectPreviewLanguage";

import appStyles from "./app.scss";

export const styles = "".concat(
  appStyles,
  l10nEditorStyles,
  createL10nModalStyles,
  previewLanguageModalStyles
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
            <ui-icon value="add-more"></ui-icon>
            <ui-label>New</ui-label>
          </ui-button>

          {appState.editor.currentL10n && (
            <>
              <ui-button
                class="header__button"
                onClick={() => window.postMessage("editor:save")}
              >
                <ui-icon value="save"></ui-icon>
                <ui-label>Save</ui-label>
              </ui-button>
              <ui-button
                class="header__button"
                onClick={() => window.postMessage("editor:open")}
              >
                <ui-icon value="folder"></ui-icon>
                <ui-label>Open</ui-label>
              </ui-button>
            </>
          )}

          {appState.editor.currentL10n && (
            <>
              <ui-button
                class="header__button"
                onClick={() => window.postMessage("editor:reload")}
              >
                <ui-icon value="refresh"></ui-icon>
                <ui-label>Reload</ui-label>
              </ui-button>
            </>
          )}

          <div class="header__spacer"></div>

          {appState.previewLanguageModal.show || (
            <ui-button
              class="header__button"
              onClick={() => (appState.previewLanguageModal.show = true)}
            >
              <ui-icon value="font"></ui-icon>
              <ui-label>
                Preview: {appState.previewLanguage.code?.toUpperCase()}
              </ui-label>
            </ui-button>
          )}
        </header>
        <div class="content">
          <div class="l10nsMenu">
            {appState.l10nsData
              .sort((a, b) => {
                if (a.code == "en") return -1;
                if (b.code == "en") return 1;
                return a.code > b.code ? 1 : -1;
              })
              .map((data) => (
                <div
                  class={
                    appState.editor.currentL10n == data
                      ? "l10nsMenu__item l10nsMenu__item--active"
                      : "l10nsMenu__item"
                  }
                  onClick={() =>
                    appState.editor.currentL10n === data
                      ? (appState.editor.currentL10n = undefined)
                      : (appState.editor.currentL10n = data)
                  }
                >
                  <div class="l10nsMenu__code">{data.code}</div>
                  {data.progress && (
                    <div class="l10nsMenu__progress">
                      {Math.round(data.progress * 100) + "%"}
                    </div>
                  )}
                  {data.code != "en" && (
                    <ui-button
                      transparent
                      class="l10nsMenu__clearButton"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        fs.removeSync(data.path);
                      }}
                    >
                      <ui-icon value="clear"></ui-icon>
                    </ui-button>
                  )}
                </div>
              ))}
          </div>
          <div class="l10nEditorContainer">
            <l10nEditor></l10nEditor>
          </div>
        </div>

        {/* Modals */}
        <createL10nModal></createL10nModal>
        <previewLanguageModal></previewLanguageModal>
      </>
    );
  },
});

const translateDataRoot = join(
  Editor.Project.path,
  "yandex-games-sdk/translate-data/"
);
if (!fs.existsSync(translateDataRoot)) {
  fs.mkdirSync(translateDataRoot, { recursive: true });
}
const enJson = join(translateDataRoot, "./en.json");
if (!fs.existsSync(enJson)) {
  fs.createFileSync(enJson);
  fs.writeFile(enJson, "{\n}", { encoding: "utf-8" });
}

chokidar.watch(translateDataRoot).on("all", (event, path) => {
  if (!path.endsWith(".json")) return;
  const code = basename(path).split(".")[0] as LanguageCode;
  if (!isLanguageCode(code)) return;

  switch (event) {
    case "add":
      appState.l10nsData.push({ code, path });
      break;
    case "change":
      window.dispatchEvent(
        new CustomEvent("localization:filechange", { detail: code })
      );
      ipc.scene.request("reload");
      ipc.main.broadcast("yandex-games-sdk:localization-reload");
      break;
    case "unlink":
      appState.l10nsData = appState.l10nsData.filter((v) => v.code !== code);
      break;
  }
});

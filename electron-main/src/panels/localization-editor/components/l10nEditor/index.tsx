import { defineComponent, watch, onMounted, ref } from "vue";
import { join } from "path";
import * as fs from "fs-extra";
import { shell } from "electron";
import { appState } from "../../state";
import { generateSchema } from "@common";
import { debounce, throttle } from "lodash";
import { deepmerge } from "@fastify/deepmerge";

import * as monaco from "monaco-editor";
import monacoStyles from "./monaco.css";

import styles from "./index.scss";

export const l10nEditorStyles = "".concat(styles, monacoStyles);

const updateSchema = debounce(() => {
  const rawLocals = appState.l10nsData.map(({ path }) =>
    JSON.parse(fs.readFileSync(path, "utf-8"))
  );

  const schema = generateSchema(deepmerge({ all: true })(...rawLocals));

  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: true,
    schemas: [
      {
        uri: "localization",
        fileMatch: ["*"],
        schema,
      },
    ],
  });
}, 1000);

export const l10nEditor = defineComponent({
  setup() {
    const el = ref<HTMLDivElement>();
    let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;

    onMounted(() => {
      updateSchema();
    });

    watch(
      appState.l10nsData,
      () => {
        updateSchema();
        if (!appState.editor.currentL10n) return;
        const code = appState.editor.currentL10n.code;
        if (!appState.l10nsData.some((v) => v.code === code)) {
          appState.editor.currentL10n = undefined;
        }
      },
      { deep: true }
    );

    watch(
      () => appState.editor.currentL10n,
      (curr, prev) => {
        if (!monacoEditor) return;

        if (prev) {
          fs.writeFileSync(prev.path, monacoEditor.getValue());
        }

        if (!curr) {
          monacoEditor.setValue("{\n}");
          return;
        }

        const value = fs.readFileSync(curr.path, "utf-8");
        monacoEditor.setValue(value);
      },
      {
        immediate: true,
      }
    );

    window.addEventListener("message", (ev) => {
      switch (ev.data) {
        case "editor:save":
          if (!monacoEditor || !appState.editor.currentL10n) return;
          fs.writeFileSync(
            appState.editor.currentL10n?.path,
            monacoEditor.getValue()
          );
          break;
        case "editor:open":
          if (!appState.editor.currentL10n) return;
          shell.showItemInFolder(appState.editor.currentL10n.path);
          break;
        case "editor:reload":
          if (!appState.editor.currentL10n || !monacoEditor) return;
          const value = fs.readFileSync(
            appState.editor.currentL10n.path,
            "utf-8"
          );
          monacoEditor.setValue(value);
          break;
      }
    });

    window.addEventListener("localization:filechange", () => updateSchema());

    onMounted(async () => {
      if (!el.value) return;

      monacoEditor = monaco.editor.create(el.value, {
        value: "{\n}",
        language: "json",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      });
    });

    return () => <div id="l10nEditor" ref={el}></div>;
  },
});

const workersRoot = join(__dirname, "../../../../../static/monaco/");
//@ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_, label) {
    switch (label) {
      case "json":
        return join(workersRoot, "./json.worker.js");
      case "css":
      case "scss":
      case "less":
        return join(workersRoot, "./css.worker.js");
      case "typescript":
      case "javascript":
        return join(workersRoot, "./ts.worker.js");
      default:
        return join(workersRoot, "./editor.worker.js");
    }
  },
} as monaco.Environment;

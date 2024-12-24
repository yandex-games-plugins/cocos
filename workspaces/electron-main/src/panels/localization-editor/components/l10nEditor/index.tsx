import { deepmerge } from "@fastify/deepmerge";
import { shell } from "electron";
import * as fs from "fs-extra";
import { debounce } from "lodash";
import * as monaco from "monaco-editor";
import { join } from "path";
import { defineComponent, onMounted, ref, watch } from "vue";

import { appState } from "../../state";
import styles from "./index.scss";
import monacoStyles from "./monaco.css";

export const l10nEditorStyles = "".concat(styles, monacoStyles);

const updateSchema = debounce(() => {
  const rawLocals = appState.translations.map(({ path }) =>
    JSON.parse(fs.readFileSync(path, "utf-8")),
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

type ObjectLike = { [key: string]: any };

export function generateSchema(obj: any) {
  if (Array.isArray(obj)) return;
  const properties: ObjectLike = {};

  for (const [key, value] of Object.entries(obj)) {
    switch (typeof value) {
      case "string":
        properties[key] = { type: "string" };
        break;
      case "object": {
        const schema = generateSchema(value);
        if (schema) properties[key] = schema;
        break;
      }
    }
  }

  return {
    type: "object",
    properties,
    required: Object.keys(properties),
  };
}

export const l10nEditor = defineComponent({
  setup() {
    const el = ref<HTMLDivElement>();
    let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;

    onMounted(() => {
      updateSchema();
    });

    watch(
      appState.translations,
      () => {
        updateSchema();

        console.log("Translations changed");

        // Case: No translation selected
        if (!appState.editor.currentTranslation) {
          appState.editor.currentTranslation = appState.translations[0];
        }

        const code = appState.editor.currentTranslation.code;

        // Current translation disappeared
        if (!appState.translations.some((v) => v.code === code)) {
          appState.editor.currentTranslation = appState.translations[0];
          console.log("Current translation disappeared");
        }
      },
      { deep: true },
    );

    watch(
      () => appState.editor.currentTranslation,
      (curr, prev) => {
        if (!monacoEditor) return;

        if (prev) {
          // Previous translation still exists
          if (appState.translations.some((v) => v.code === prev.code)) {
            fs.writeFileSync(prev.path, monacoEditor.getValue());
          }
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
      },
    );

    window.addEventListener("message", (ev) => {
      switch (ev.data) {
        case "editor:save":
          if (!monacoEditor || !appState.editor.currentTranslation) return;
          fs.writeFileSync(
            appState.editor.currentTranslation?.path,
            monacoEditor.getValue(),
          );
          break;
        case "editor:open":
          if (!appState.editor.currentTranslation) return;
          shell.showItemInFolder(appState.editor.currentTranslation.path);
          break;
        case "editor:reload": {
          if (!appState.editor.currentTranslation || !monacoEditor) return;
          const value = fs.readFileSync(
            appState.editor.currentTranslation.path,
            "utf-8",
          );
          monacoEditor.setValue(value);
          break;
        }
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

    return () => (
      <>
        <div id="l10neditor-container">
          <div
            id="l10neditor-spinner"
            style={
              appState.editor.currentTranslation
                ? "display: none"
                : "display: visible"
            }
          />
          <div
            id="l10neditor-editor"
            ref={el}
            style={
              appState.editor.currentTranslation
                ? "display: visible"
                : "display: none"
            }
          />
        </div>
      </>
    );
  },
});

const workersRoot = join(__dirname, "../../../../../static/monaco/");
//@ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_, label) {
    switch (label) {
      case "json":
        return join(workersRoot, "./json.worker.js");
      default:
        return join(workersRoot, "./editor.worker.js");
    }
  },
} as monaco.Environment;

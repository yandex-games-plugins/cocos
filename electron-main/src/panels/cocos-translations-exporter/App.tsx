import { defineComponent } from "vue";

import appStyles from "./app.scss";
import { ipc } from "@common";
import { dialog } from "@electron/remote";

export const styles = "".concat(appStyles);

export default defineComponent({
  name: "L10nExperiments",
  components: {},
  setup() {
    return () => (
      <>
        <h2>
          Export and import translations <br /> from Cocos Creator's L10N
          Plugin.
        </h2>
        <ui-button
          onClick={async () => {
            const dialogReturn = await dialog.showOpenDialog({
              properties: ["openDirectory"],
            });
            const path = dialogReturn.filePaths[0];
            ipc.main.request("export-cocos-translations-translations", path);
          }}
        >
          <ui-label>Export</ui-label>
        </ui-button>
        <ui-button
          onClick={async () => {
            const dialogReturn = await dialog.showOpenDialog({
              properties: ["openFile"],
              filters: [{ name: "Archive", extensions: ["zip"] }],
            });
            const path = dialogReturn.filePaths[0];
            ipc.main.request("import-cocos-translations-translations", path);
          }}
        >
          <ui-label>Import</ui-label>
        </ui-button>
      </>
    );
  },
});

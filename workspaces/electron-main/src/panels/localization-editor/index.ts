import { type App, createApp } from "vue";

import PanelApp, { styles } from "./App";

const panelDataMap = new WeakMap<any, App>();

/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
Editor.Panel.define =
  Editor.Panel.define ||
  function (options: any) {
    return options;
  };

module.exports = Editor.Panel.define({
  template: `<div id="panel"></div>`,
  style: styles,
  listeners: {
    show() {},
    hide() {},
  },
  $: {
    panel: "#panel",
  },
  ready() {
    if (this.$.panel) {
      const app = createApp(PanelApp);
      app.mount(this.$.panel);
      panelDataMap.set(this, app);
    }
  },
  beforeClose() {},
  close() {
    const app = panelDataMap.get(this);
    if (app) {
      app.unmount();
    }
  },
});

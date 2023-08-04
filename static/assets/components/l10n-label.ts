import { _decorator, Label, Component } from "cc";
import { EDITOR } from "cc/env";
import { l10n } from "../ysdk";
import { L10nComponent } from "./l10n-component";

const { ccclass, property, executeInEditMode, requireComponent, menu } =
  _decorator;

@ccclass("L10nLabel")
@executeInEditMode(true)
@requireComponent(Label)
@menu("YandexGamesSDK/L10nLabel")
export default class L10nLabel extends L10nComponent {
  label?: Label | null = undefined;

  @property({ visible: false })
  _key = "";

  get key(): string {
    return this._key;
  }

  @property({ visible: true })
  set key(value: string) {
    this._key = value;
    if (this.label) this.label.string = this._key;
    this.render();
  }

  protected start() {
    this.render();
  }

  onLoad() {
    this.label = this.node.getComponent(Label);
  }

  public preview(value: string) {
    if (!this.label) return;

    const originalString = this.label.string;
    this.label["_string"] = value;
    this.label.updateRenderData(true);
    cce.Engine.repaintInEditMode();
    this.label["_string"] = originalString;
  }

  render() {
    const translatedString = this.translateKey(this._key);
    if (
      typeof this.label === "undefined" ||
      typeof translatedString === "undefined"
    ) {
      return;
    }
    if (EDITOR) {
      this.preview(translatedString);
    } else {
      this.label!.string = translatedString;
    }
  }
}

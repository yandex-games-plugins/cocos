import { _decorator, RichText, Component } from "cc";
import { EDITOR } from "cc/env";
import { l10n } from "../ysdk";
import { L10nComponent } from "./l10n-component";

const { ccclass, property, executeInEditMode, requireComponent, menu } =
  _decorator;

@ccclass("L10nRichText")
@executeInEditMode(true)
@requireComponent(RichText)
@menu("YandexGamesSDK/L10nRichText")
export default class L10nRichText extends L10nComponent {
  richText?: RichText | null = undefined;

  @property({ visible: false })
  _key = "";

  @property({ visible: true })
  set key(value: string) {
    this._key = value;
    if (this.richText) this.richText.string = this._key;
    this.render();
  }

  get key(): string {
    return this._key;
  }

  protected start() {
    this.render();
  }

  onLoad() {
    this.richText = this.node.getComponent(RichText);
  }

  public preview(value: string) {
    if (!this.richText) return;

    const originalString = this.richText.string;
    this.richText["_string"] = value;
    this.richText["_updateRichText"]();
    cce.Engine.repaintInEditMode();
    this.richText["_string"] = originalString;
  }

  render() {
    const translatedString = this.translateKey(this._key);
    if (
      typeof this.richText === "undefined" ||
      typeof translatedString === "undefined"
    ) {
      return;
    }
    if (EDITOR) {
      this.preview(translatedString);
    } else {
      this.richText!.string = translatedString;
    }
  }
}

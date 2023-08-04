import EventEmitter from "../../../public/EventEmitter";
import { ISceneKeyboardEvent } from "../../../../private";
declare class Shortcut extends EventEmitter {
  /**
   * 快捷键配置
   * 左边是键盘事件 event.key.toLowerCase
   * 右边是可阅读的事件指令
   * 注意：这份配置开放给用户，需要注意：
   * ctrl alt shift 有先后顺序
   * Command 和 Control 同为 ctrl
   */
  private shortcuts;
  constructor();
  onKeyDown(event: ISceneKeyboardEvent): void;
}
declare const _default: Shortcut;
export default _default;
//# sourceMappingURL=index.d.ts.map

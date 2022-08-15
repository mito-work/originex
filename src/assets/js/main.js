import "core-js";
import "regenerator-runtime";
import { getJSDocParameterTags } from "typescript";

// import { textAnimation } from "./lib/animation";

import "../scss/common.scss";

class Toggle {
  constructor(selector, target) {
    this.node = document.querySelector(selector);
    this.target = document.querySelector(target);
    this.objectName = selector.substring(4);
    this.node.addEventListener("click", this._show.bind(this));
  }
  _show() {
    //aria-expandedの属性切り替え
    //文字列で定義されているので属性はboolean型にならない
    //今ついている属性と逆が入る true !== false true , false !== false false
    const isExpanded = this.node.getAttribute("aria-expanded") !== "false";
    this.node.setAttribute("aria-expanded", !isExpanded);
    this.target.classList.toggle(`is-${this.objectName}Active`);
  }
}
new Toggle(".js-drawer", "body");

gsap.set(".js-anime", { opacity: 0, y: 100 }); //初期状態をセット

ScrollTrigger.batch(".js-anime", {
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0 }),
  start: "top 50%",
  once: true,
  markers: false,
});

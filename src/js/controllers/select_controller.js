import { Controller } from "stimulus";
import { useClickOutside, useTransition } from "stimulus-use";

export default class extends Controller {
  static targets = ["button", "menu"];
  static values = { originStyle: String, targetStyle: String };

  connect() {
    useTransition(this, { element: this.menuTarget });
    useClickOutside(this);
  }

  open() {
    this.enter();
  }

  close(event) {
    if (event.keyCode && event.keyCode != 27) {
      return;
    }
    this.leave();
  }

  toggle() {
    this.toggleTransition();
    if (this.transitioned) {
      // Focus on first element
    } else {
      this.buttonTarget.blur()
    }
  }
}

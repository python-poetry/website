import { Controller } from "@hotwired/stimulus"
import { useTransition } from "stimulus-use"

export default class extends Controller {
  static targets = ["button", "menu"]

  connect() {
    useTransition(this, { element: this.menuTarget })
  }

  open() {
    this.enter()
  }

  close() {
    this.leave()
  }
}

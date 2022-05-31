import { Controller } from "@hotwired/stimulus"
import { useClickOutside, useTransition } from "stimulus-use"

export default class extends Controller {
  static targets = ["button", "menu", "buttonTitle"]
  static values = { originStyle: String, targetStyle: String }

  connect() {
    useTransition(this, { element: this.menuTarget })
    useClickOutside(this)
  }

  open() {
    this.enter()
  }

  close(event) {
    if (event.keyCode && event.keyCode != 27) {
      return
    }
    this.leave()
  }

  select(event) {
    event.preventDefault()

    const title = event.currentTarget.dataset.selectTitle
    if (!title || !this.hasButtonTitleTarget) {
      return
    }

    this.buttonTitleTarget.textContent = title

    this.close(event)
  }

  toggle() {
    this.toggleTransition()
    if (this.transitioned) {
      // Focus on first element
    } else {
      this.buttonTarget.blur()
    }
  }
}

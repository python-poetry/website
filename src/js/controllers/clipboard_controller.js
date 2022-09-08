import { Controller } from "@hotwired/stimulus"
import checkmarkIcon from "../../../static/images/checkmark.svg"
import copyIcon from "../../../static/images/content_copy.svg"

export default class extends Controller {
  initialize() {
    document
      .querySelectorAll("div.highlight > pre > code")
      .forEach((codeBlock) => {
        const button = document.createElement("button")
        button.className = "clipboard-button"
        button.type = "button"
        button.title = "Copy to clipboard"
        const _copyIcon = copyIcon.cloneNode()
        const _checkmarkIcon = checkmarkIcon.cloneNode()
        button.appendChild(_copyIcon)
        button.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.innerText).then(
            () => {
              button.blur()
              button.replaceChild(_checkmarkIcon, _copyIcon)
              setTimeout(
                () => button.replaceChild(_copyIcon, _checkmarkIcon),
                2000
              )
            },
            () => (button.innerHTML = "Error")
          )
        })
        const pre = codeBlock.parentNode
        pre.parentNode.insertBefore(button, pre)
      })
  }
}

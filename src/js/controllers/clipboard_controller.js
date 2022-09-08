import checkmark from "../../../static/images/checkmark.svg"
import copyIcon from "../../../static/images/content_copy.svg"
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    document
      .querySelectorAll("div.clipboard > div.highlight > pre")
      .forEach((codeBlock) => {
        const button = document.createElement("button")
        button.className = "clipboard-button"
        button.type = "button"
        button.title = "Copy to clipboard"
        button.appendChild(copyIcon)
        button.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.innerText).then(
            () => {
              button.blur()
              button.replaceChild(checkmark, copyIcon)
              setTimeout(() => button.replaceChild(copyIcon, checkmark), 2000)
            },
            () => (button.innerHTML = "Error")
          )
        })
        codeBlock.parentNode.insertBefore(button, codeBlock)
      })
  }
}

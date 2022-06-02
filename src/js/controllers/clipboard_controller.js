import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  checkmark = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="rgb(65, 250, 15)"/>
    </svg>`

  copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>`

  initialize() {
    document
      .querySelectorAll("div.clipboard > div.highlight > pre")
      .forEach((codeBlock) => {
        const button = document.createElement("button")
        button.className = "clipboard-button"
        button.type = "button"
        button.title = "Copy to clipboard"
        button.innerHTML = this.copyIcon
        button.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.innerText).then(
            () => {
              button.blur()
              button.innerHTML = this.checkmark
              setTimeout(() => (button.innerHTML = this.copyIcon), 2000)
            },
            () => (button.innerHTML = "Error")
          )
        })
        codeBlock.parentNode.insertBefore(button, codeBlock)
      })
  }
}

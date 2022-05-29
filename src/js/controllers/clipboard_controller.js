import { Controller } from "stimulus"

export default class extends Controller {
  svgCopy =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'
  svgCheck =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

  clipboard = navigator.clipboard

  initialize() {
    document
      .querySelectorAll("div.clipboard > div.highlight > pre")
      .forEach((codeBlock) => {
        const button = document.createElement("button")
        button.className = "clipboard-button"
        button.type = "button"
        button.title = "Copy to clipboard"
        button.innerHTML = this.svgCopy
        button.addEventListener("click", () => {
          this.clipboard.writeText(codeBlock.innerText).then(
            () => {
              button.blur()
              button.innerHTML = this.svgCheck
              setTimeout(() => (button.innerHTML = this.svgCopy), 2000)
            },
            () => (button.innerHTML = "Error")
          )
        })
        codeBlock.parentNode.insertBefore(button, codeBlock)
      })
  }
}

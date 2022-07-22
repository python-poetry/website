import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.isDarkMode = document.documentElement.classList.contains("dark")
  }

  toggle() {
    const oldMode = this.isDarkMode ? "dark" : "light"
    const newMode = this.isDarkMode ? "light" : "dark"

    document.documentElement.classList.add(newMode)
    document.documentElement.classList.remove(oldMode)
    document.documentElement.style.setProperty("color-scheme", newMode)

    this.isDarkMode = !this.isDarkMode

    window.localStorage.setItem("color-mode", newMode)
  }
}

import { Controller } from 'stimulus'


export default class extends Controller {
    static targets = ['menu']
    static values = { originStyle: String, targetStyle: String }

    show() {
        this.menuTarget.hidden = false
        this.menuTarget.classList.remove(...(this.originStyleValue.split(' ')))
        this.menuTarget.classList.add(...(this.targetStyleValue.split(' ')))
    }

    hide() {
        this.menuTarget.classList.remove(...(this.targetStyleValue.split(' ')))
        this.menuTarget.classList.add(...(this.originStyleValue.split(' ')))
        this.menuTarget.hidden = true
    }
}

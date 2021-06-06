import "./css/app.css"

import { Application } from "stimulus"
import { TransitionController, ClickOutsideController } from 'stimulus-use'
import MenuController from './js/controllers/menu_controller'
import SelectController from './js/controllers/select_controller'

const application = Application.start()
application.register("transition", TransitionController)
application.register("click-outside", ClickOutsideController)
application.register("menu", MenuController)
application.register("select", SelectController)

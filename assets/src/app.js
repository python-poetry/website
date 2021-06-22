import "./css/app.css"

import algoliasearch from 'algoliasearch/dist/algoliasearch.esm.browser'
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js"
import Particles from "./js/particles"
import { Application } from "stimulus"
import { TransitionController, ClickOutsideController } from 'stimulus-use'
import MenuController from './js/controllers/menu_controller'
import SelectController from './js/controllers/select_controller'
import ModeSwitchController from './js/controllers/mode_switch_controller'
import FlyoverController from './js/controllers/flyover_controller'

const application = Application.start()
application.register("transition", TransitionController)
application.register("click-outside", ClickOutsideController)
application.register("menu", MenuController)
application.register("select", SelectController)
application.register("mode-switch", ModeSwitchController)
application.register("flyover", FlyoverController)

const particlesSection = document.getElementById("title-section")

if (particlesSection) {
  const particles = new Particles(particlesSection)
  particles.start()
}

// Search
const searchClient = algoliasearch(
  'SIHVOPCWNI',
  'ed995fb51a9bb73b4d9da7857ea3a368'
)

const searchContainer = Array.from(document.getElementsByClassName("search-container")).filter((element) => {
  return window.getComputedStyle(element).getPropertyValue("display") !== "none"
})[0]

if (searchContainer) {
  autocomplete({
    container: searchContainer,
    placeholder: "Search",
    getSources({query}) {
      if (query.length < 3) {
        return []
      }

      return [
        {
          sourceId: 'docs',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'docs',
                  query,
                  filters: `version:${searchContainer.dataset.version}`,
                  params: {
                    hitsPerPage: 5,
                    highlightPreTag: '<em class="highlight">',
                    highlightPostTag: '</em>'
                  },
                },
              ],
            });
          },
          templates: {
            item({item, createElement}) {
              let snippetTitle = item._snippetResult.title
              let snippetContent = item._snippetResult.content

              if (snippetTitle) {
                snippetTitle = snippetTitle.value
              } else {
                snippetTitle = item.title
              }

              if (snippetContent) {
                snippetContent = snippetContent.value
              } else {
                snippetContent = item.content
              }

              return createElement('div', {
                dangerouslySetInnerHTML: {
                  __html: `<div class="search-result">
                      <a href="${item.relpermalink}" title="${snippetTitle}">
                          <h4>${snippetTitle}</h4>
                          <p class="snippet">${snippetContent}</p>
                      </a>
                      </div>`
                }
              })
            },
            footer({createElement}) {
              return createElement('div', {
                dangerouslySetInnerHTML: {
                  __html:
                    '<div class="flex items-center justify-end w-full">' +
                    '<span>' +
                    'Search by ' +
                    '<a href="https://www.algolia.com" title="Algolia">' +
                    '<img class="h-6 inline-block" src="/images/logo-algolia-nebula-blue-full.svg" alt="Algolia logo" />' +
                    '</a>' +
                    '</span>' +
                    '</div>'
                }
              })
            }
          }
        },
      ];
    }
  })
}

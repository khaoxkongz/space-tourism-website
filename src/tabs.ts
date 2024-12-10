import { hideContent, showContent } from './utils.ts'

export function changeTabs() {
  const tabList = document.querySelector('[role="tablist"]') as HTMLDivElement
  const tabs = tabList?.querySelectorAll('[role="tab"]') as NodeListOf<HTMLButtonElement>

  let tabFocus = 0

  const changeTabsFocus = (e: KeyboardEvent): void => {
    // change the tabindex of the current tab to -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      tabs[tabFocus].setAttribute('tabindex', '-1')

      // if the right key is pushed, move to the next tab on the right
      // if the left key is pushed, move to the next tab on the left
      if (e.key === 'ArrowRight') {
        tabFocus++
        if (tabFocus >= tabs.length) {
          tabFocus = 0
        }
      } else {
        tabFocus--
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1
        }
      }

      tabs[tabFocus].setAttribute('tabindex', '0')
      tabs[tabFocus].focus()
    }
  }

  const changeTabPanel = (e: Event): void => {
    const targetTab = e.target as HTMLButtonElement
    const targetPanel = targetTab.getAttribute('aria-controls')
    const targetImage = targetTab.getAttribute('data-image')

    const tabContainer = targetTab.parentElement as HTMLDivElement
    const mainContainer = tabContainer.parentElement as HTMLDivElement

    tabContainer
      .querySelector('[aria-selected="true"]')
      ?.setAttribute('aria-selected', 'false')

    targetTab.setAttribute('aria-selected', 'true')

    hideContent(mainContainer, '[role="tabpanel"]')
    showContent(mainContainer, `#${targetPanel}`)

    hideContent(mainContainer, 'picture')
    showContent(mainContainer, `#${targetImage}`)
  }

  tabList?.addEventListener('keydown', changeTabsFocus)
  tabs?.forEach((tab) => tab.addEventListener('click', changeTabPanel))
}

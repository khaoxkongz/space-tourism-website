import { hideContent, showContent } from './utils.ts'

export function changeDots() {
  const dotList = document.querySelector('[role="dotlist"]') as HTMLDivElement
  const dots = dotList?.querySelectorAll('[role="dot"]') as NodeListOf<HTMLButtonElement>

  let dotFocus = 0

  const changeDotsFocus = (e: KeyboardEvent): void => {
    // change the tabindex of the current tab to -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      dots[dotFocus].setAttribute('tabindex', '-1')

      // if the right key is pushed, move to the next tab on the right
      // if the left key is pushed, move to the next tab on the left
      if (e.key === 'ArrowRight') {
        dotFocus++
        if (dotFocus >= dots.length) {
          dotFocus = 0
        }
      } else {
        dotFocus
        if (dotFocus < 0) {
          dotFocus = dots.length - 1
        }
      }

      dots[dotFocus].setAttribute('tabindex', '0')
      dots[dotFocus].focus()
    }
  }

  const changeDotPanel = (e: Event): void => {
    const targetDot = e.target as HTMLButtonElement
    const targetPanel = targetDot.getAttribute('aria-controls')
    const targetImage = targetDot.getAttribute('data-image')

    const tabContainer = targetDot.parentElement as HTMLDivElement
    const mainContainer = tabContainer.parentElement as HTMLDivElement

    tabContainer
      .querySelector('[aria-selected="true"]')
      ?.setAttribute('aria-selected', 'false')

    targetDot.setAttribute('aria-selected', 'true')

    hideContent(mainContainer, '[role="dotpanel"]')
    showContent(mainContainer, `#${targetPanel}`)

    hideContent(mainContainer, 'picture')
    showContent(mainContainer, `#${targetImage}`)
  }

  dotList?.addEventListener('keydown', changeDotsFocus)
  dots?.forEach((dot) => dot.addEventListener('click', changeDotPanel))
}

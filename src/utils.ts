export function hideContent(element: HTMLDivElement, content: string): void {
  element
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute('hidden', 'true'))
}

export function showContent(element: HTMLDivElement, content: string): void {
  element
    .querySelector(content)
    ?.removeAttribute('hidden')
}

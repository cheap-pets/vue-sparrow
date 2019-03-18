export default function emitEvent (el, eventName, canBubble = false, cancelable = true) {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, canBubble, cancelable)
  return el.dispatchEvent(event)
}

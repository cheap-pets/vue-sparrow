export default function emitEvent (el, eventName, options = {}) {
  const { canBubble = false, cancelable = true, data } = options
  const event = document.createEvent('CustomEvent')
  if (data) event._su_event_data = data
  event.initCustomEvent(eventName, canBubble, cancelable)
  return el.dispatchEvent(event)
}

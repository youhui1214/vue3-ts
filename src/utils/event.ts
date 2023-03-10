import { onMounted, onUnmounted, Ref, watch, ref, reactive } from 'vue'

/**
 * Add an event listener on window for the duration of component lifetime.
 * @param event name of event to register
 * @param handler event handler
 */
export function useWindowEvent<K extends keyof WindowEventMap> (
  event: K,
  handler: (e: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void {
  onMounted(() => {
    window.addEventListener(event, handler, options)
  })
  onUnmounted(() => {
    window.removeEventListener(event, handler, options)
  })
}

const animTime = ref(0)

export function useAnimTime (): Ref<number> {
  return animTime
}

const rafCallbacks: ((t: number) => void)[] = []

export function useRaf (fn: (t: number) => void): void {
  onMounted(() => {
    rafCallbacks.push(fn)
  })
  onUnmounted(() => {
    const i = rafCallbacks.indexOf(fn)
    if (i >= 0) {
      rafCallbacks.splice(i, 1)
    }
  })
}

requestAnimationFrame(function tick (time) {
  animTime.value = time
  requestAnimationFrame(tick)
  rafCallbacks.forEach((f) => f(time))
})

export function useMouseCoords (): {
  pageX: number
  pageY: number
  clientX: number
  clientY: number
  } {
  const coords = reactive({
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0
  })
  useWindowEvent('mousemove', (e) => {
    coords.pageX = e.pageX
    coords.pageY = e.pageY
    coords.clientX = e.clientX
    coords.clientY = e.clientY
  })
  return coords
}

interface Size {
  width: number
  height: number
}

/**
 * Get DOM node size and keep it up to date.
 *
 * # Warning:
 * Updating DOM node layout based on values derived from their size can introduce
 * unwanted feedback loops across the script and layout reflow. Avoid doing that.
 *
 * @param elementRef Ref obejct the DOM node to observe.
 * @returns ref containing always up-to-date content DOMRect of the target DOM node.
 */
export function useDOMNodeSize (elementRef: Ref<HTMLElement | undefined>): Ref<Size> {
  const sizeRef = ref({ width: 0, height: 0 })
  const observer = new ResizeObserver((entries) => {
    let rect = null
    for (const entry of entries) {
      if (entry.target === elementRef.value) {
        rect = entry.contentRect
      }
    }
    if (rect != null) {
      sizeRef.value = {
        width: rect.width,
        height: rect.height
      }
    }
  })

  watch(elementRef, (newNode, oldNode) => {
    if (oldNode != null) {
      observer.unobserve(oldNode)
    }
    if (newNode != null) {
      observer.observe(newNode)
    }
  })

  return sizeRef
}

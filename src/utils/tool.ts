export function debounce(fn, delay = 500) {
  let timer
  return function() {
      let args = arguments
      if (timer) {
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
          fn.apply(this, args)
      }, delay)
  }
}

export function throttle(fn, delay = 500) {
  let startTime = Date.now()
  return function() {
      let args = arguments
      let currentTime = Date.now()
      if (currentTime - startTime > delay) {
          fn.apply(this, args)
          startTime = currentTime // 刷新旧的startTime
      }
  }
}

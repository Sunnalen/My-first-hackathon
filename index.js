class Slider {
  constructor(element, { timeout = 500, valueScreen = 400 }) {
    this.$element = element
    this.$children = Array.from(this.$element.childNodes).filter((child, index) => index % 2 !== 0)
    this.DEFAULT_VALUE = valueScreen
    this.animatedKey = 'transform'
    this.TRANSITION_DURATION = `${timeout}ms`
  }

  set toX(x) {
    this.$element.style[this.animatedKey] = `translateX(${x}px)`
  }

  get toX() {
    return this.$element.style[this.animatedKey]
  }

  getCoords() {
    const leftBorder = 0
    const rightBorder = window.innerWidth
    const firstSlide = this.$children[0]
    const lastSlide = this.$children.at(-1)

    const isRetryNext = this.getCoordsForRetry(firstSlide, 'left', leftBorder)
    const isRetryPrev = this.getCoordsForRetry(lastSlide, 'left', rightBorder, true)

    return isRetryPrev || isRetryNext
  }

  getCoordsForRetry(slide, key, border, min) {
    if (min) {
      return slide.getBoundingClientRect()[key] < border
    } else {
      return slide.getBoundingClientRect()[key] >= border - this.DEFAULT_VALUE
    }
  }

  calculateNextCoords(symbol) {
    let sum = 0
    const currentX = parseInt(this.toX.split('(')[1])
    if (symbol === '-') {
      sum = eval(`${currentX} - ${this.DEFAULT_VALUE}`)
    } else {
      sum = eval(`${currentX} + ${this.DEFAULT_VALUE}`)
    }
    return sum
  }

  handler(state) {
    const symbol = state === 'next' ? '+' : '-'
    if (this.getCoords()) {
      this.toX = -this.DEFAULT_VALUE
    } else {
      this.toX = this.calculateNextCoords(symbol)
    }
  }

  init() {
    this.toX = -this.DEFAULT_VALUE * 3
    setTimeout(() => this.$element.style.transitionDuration = this.TRANSITION_DURATION, 50)
  }
}

const $slider = document.querySelector('#slider__photo')
const $triggerList = document.querySelectorAll('[data-photo-slider]')

const slider = new Slider($slider, {})
slider.init()

$triggerList.forEach((trigger) => {
  trigger.addEventListener('click', () => slider.handler(trigger.dataset.photoSlider))
})

const $dev = document.querySelector('#slider__dev')
const sliderOrder = new Slider($dev, {
  timeout: 10000
})
sliderOrder.init()

const $triggerList2 = document.querySelectorAll('[data-dev-slider]')

$triggerList2.forEach((trigger) => {
  trigger.addEventListener('click', () => sliderOrder.handler(trigger.dataset.devSlider))
})

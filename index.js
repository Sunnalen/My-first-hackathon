class Slider {
  constructor(element) {
    this.$element = element
    this.DEFAULT_VALUE = 400 
    this.children = Array.from(this.$element.childNodes).filter((element, index) => index && index % 2 !== 0 )
    this.value = 0
  }

  set toX(x) {
    this.value = x
    this.children.forEach(child => {child.style.transform = `translateX(${x}px)`})
  }

  setToXItem(x, child) {
     child.style.left = `${x}px`
     console.log(x, child)
  }

  get toX() {
    return this.children[0].style.transform
  }

  getCoords() {
    const right = window.innerWidth
    const left = 0
    this.setToXItem(this.value - 400, this.children.at(-1))
  }

  prev() { 
    this.getCoords()
    if(this.toX) {
      const tX = parseInt(this.toX.split('(')[1]) - 400
      this.toX = tX
    } else {
      this.toX = -400
    }
  }
  
  next() {
    this.getCoords()
    if(this.toX) {
      const tX = parseInt(this.toX.split('(')[1]) + 400
      this.toX = tX
    } else {
      this.toX = 400
    }
    
  }
}

const $slider = document.querySelector('#slider__photo')
const $triggerList = document.querySelectorAll('[data-photo-slider]')

const slider = new Slider($slider)

$triggerList.forEach((trigger) => {
  trigger.addEventListener('click', () => slider[trigger.dataset.photoSlider]())
})



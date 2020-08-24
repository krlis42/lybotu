const nextIndex = function(slide, offset) {
    // let slide = button.closest('.kr-slide')
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    // let offset = parseInt(button.dataset.offset, 10)
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const showImageAtIndex = function(slide, index) {
    slide.dataset.active = String(index)
    let nextSelector = '#id-krimage-' + String(index)
    let className = 'kr-slide-image-active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)
}

const showDotAtIndex = function(index) {
    removeClassAll('kr-dot-active')
    let dotSelector = '#id-dot-' + String(index)
    let dot = e(dotSelector)
    dot.classList.add('kr-dot-active')
}

const showAtIndex = function(slide, index) {
    showImageAtIndex(slide, index)
    showDotAtIndex(index)
}

const bindEventSlide = function() {
    let selector = '.kr-slide-button'
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let offset = Number(self.dataset.offset)
        let slide = self.closest('.kr-slide')
        let index = nextIndex(slide, offset)
        showAtIndex(slide, index)
    })
}

const bindEventDot = function() {
    let selector = '.kr-slide-dot'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        let slide = self.closest('.kr-slide')
        showAtIndex(slide, index)
    })
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        let slide = self.closest('.kr-slide')
        showAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventDot()
}

const playNextImage = function() {
    let slide = e('.kr-slide')
    let index = nextIndex(slide, 1)
    showAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

const __main = function() {
    bindEvents()
    autoPlay()
}

__main()

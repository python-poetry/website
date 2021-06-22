class Particle {
  constructor(canvas, container) {
    const random = Math.random()
     const containerWidth = container.offsetWidth
     const containerHeight = container.offsetHeight

    this.progress = 0;
    this.canvas = canvas
    this.center = {
      x: containerWidth / 2,
      y: containerHeight / 2
    }
    this.pointOfAttraction = {
      x: containerWidth / 2,
      y: containerHeight / 2
    }

    if (Math.random() > 0.5) {
      this.x = containerWidth * Math.random()
      this.y = Math.random() > 0.5 ? -Math.random() - 100 : containerHeight + Math.random() + 100
    } else {
      this.x = Math.random() > 0.5 ? -Math.random() - 100 : containerWidth + Math.random() + 100
      this.y = containerHeight * Math.random()
    }

    this.s = Math.random() * 2
    this.a = 0
    this.w = containerWidth
    this.h = containerHeight
    this.radius = random > .2 ? Math.random() : Math.random() * 3
    this.color  = random > .2 ? "#FB7185" : "#38BDF8"
    this.radius = random > .8 ? Math.random() * 2.2 : this.radius
    this.color  = random > .8 ? "#818CF8" : this.color
  }

  calculateDistance(v1, v2){
    let x = Math.abs(v1.x - v2.x)
    let y = Math.abs(v1.y - v2.y)

    return Math.sqrt((x * x) + (y * y))
  }

  render(){
    this.canvas.beginPath()
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.canvas.lineWidth = 2
    this.canvas.fillStyle = this.color
    this.canvas.fill()
    this.canvas.closePath()
  }

  move(){
    const p1 = {
      x: this.x,
      y: this.y
    }

    const distance = this.calculateDistance(p1, this.pointOfAttraction)
    const force = Math.max(100, (1 + distance))

    const attr_x = (this.pointOfAttraction.x - this.x) / force
    const attr_y = (this.pointOfAttraction.y - this.y) / force

    this.x += (Math.cos(this.a) * (this.s)) + attr_x
    this.y += (Math.sin(this.a) * (this.s)) + attr_y
    this.a += (Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2)

    if (distance < (10 + Math.random()*100)){
      return false
    }

    this.render()
    this.progress++

    return true
  }
}

class CenterParticle{
  constructor(canvas, container){
      let random = Math.random()
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight

      this.progress = 0
      this.canvas = canvas

      this.x = containerWidth / 2  + (Math.random()*200 - Math.random() * 200)
      this.y = containerHeight / 2 + (Math.random()*200 - Math.random() * 200)

      this.w = containerWidth
      this.h = containerHeight
      this.radius = random > .2 ? Math.random() : Math.random() *3
      this.color  = random > .2 ? "#E879F9" : "#818CF8"
      this.radius = random > .8 ? Math.random()*2 : this.radius
      this.color  = random > .8 ? "#38BDF8" : this.color

      // this.color  = random > .1 ? "#ffae00" : "#f0ff00" // Alien
      this.variantx1 = Math.random()*300
      this.variantx2 = Math.random()*400
      this.varianty1 = Math.random()*100
      this.varianty2 = Math.random()*120
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move(){
    // this.x += (Math.sin(this.progress/this.variantx1)*Math.cos(this.progress/this.variantx2));
    // this.y += (Math.sin(this.progress/this.varianty1)*Math.cos(this.progress/this.varianty2));
    this.x += (Math.sin(this.progress/this.variantx1) * Math.cos(this.progress/this.variantx2))
    this.y += (Math.cos(this.progress/this.varianty2))

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false
    }

    this.render()
    this.progress++

    return true
  }
}

export default class Particles {
    constructor(container, maxParticles = 100, frequency = 20) {
        this.container = container
        this.maxParticles = maxParticles
        this.frequency = frequency
        this.particles = []
        this.maxTime = this.frequency * this.maxParticles
        this.timeToRecreate = false
        this.fillColor = {
            "light": "#F0F4FC",
            "dark": "#0F172A"
        }
    }

    start() {
        setTimeout(function () {
            this.timeToRecreate = true
        }.bind(this))

        this.canvasElement = document.createElement("canvas")
        this.canvasElement.width = this.container.offsetWidth
        this.canvasElement.height = this.container.offsetHeight
        this.container.prepend(this.canvasElement)

        this.canvas = this.canvasElement.getContext("2d")

        const observer = new MutationObserver(() => {
            this.clear(true)
        })

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
          childList: false,
          characterData: false
        })

        window.addEventListener("resize", () => {
            this.clear(false, true)
        })

        this._doStart()
    }

    _doStart() {
        this.populate(this.maxParticles)

        this.update()
    }

    populate(numberOfParticles) {
        for (let i = 0; i < numberOfParticles; i++) {
            setTimeout(function() {
                this.particles.push(new CenterParticle(this.canvas, this.container))
            }.bind(this), this.frequency * i)
        }

        return this.particles.length
    }

    clear(redraw = false, resize = false) {
        if (resize) {
            this.canvasElement.width = this.container.offsetWidth
            this.canvasElement.height = this.container.offsetHeight
        }

        this.canvas.globalAlpha = 0.30
        this.canvas.globalCompositeOperation = "destination-out"
        this.canvas.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height)
        this.canvas.globalCompositeOperation = "source-over"
        this.canvas.globalAlpha = 1
    }

    update() {
        this.particles = this.particles.filter((p) => { return p.move() })

        if (this.timeToRecreate && this.particles.length < this.maxParticles) {
            this.populate(1)
        }

        this.clear()
        requestAnimationFrame(this.update.bind(this))
    }
}

<template>
  <div id="canvas">
  </div>
</template>

<script>
const RENDERER_W = 1920
const RENDERER_H = 800
const RENDERER_BG_COLOR = 0xF4F4F4

let renderer, stage

export default {
  methods: {
    handleResize: function () {
      // const ratio = Math.min(window.innerWidth / RENDERER_W, window.innerHeight / RENDERER_H)
      const ratio = document.body.clientWidth / RENDERER_W
      stage.scale.x = stage.scale.y = ratio
      renderer.resize(Math.ceil(RENDERER_W * ratio), Math.ceil(RENDERER_H * ratio))
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    class Shape extends PIXI.Graphics {
      constructor(stage, x, y, w, h, fill) {
        super()
        this.beginFill(fill)
        this.drawEllipse(x, y, w, h)
        this.endFill()
        stage.addChild(this)
      }
    }

    window.addEventListener('resize', this.handleResize)
    renderer = PIXI.autoDetectRenderer(
      RENDERER_W, RENDERER_H,
      {
        antialias: true,
        transparent: false
      }
    )
    stage = new PIXI.Container()

    const leftTop = new Shape(stage, 280, 150, 350, 350, 0xFF7600)
    const rightTop = new Shape(stage, 1750, 50, 250, 250, 0x05BBB7)
    const leftBottom = new Shape(stage, 250, 800, 250, 250, 0xDC0451)
    const rightBottom = new Shape(stage, 1700, 700, 350, 350, 0xFDC82F)
    const central = new Shape(stage, 960, 400, 400, 390, 0xFFFFFF)
    
    document.getElementById("canvas").appendChild(renderer.view)
    this.handleResize()

    renderer.backgroundColor = RENDERER_BG_COLOR
    animate()

    let count = 0

    function animate() {
        count += 0.1
        central.rotation = count * 0.1
        renderer.render(stage)
        requestAnimationFrame(animate)
    }

  }
}
</script>

<style lang="stylus">
</style>

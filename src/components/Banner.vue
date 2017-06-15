<template>
  <div id="canvas">
    <slogan></slogan>
  </div>
</template>

<script>
import slogan from '../components/Slogan.vue'

const RENDERER_W = 1920
const RENDERER_H = 800
const RENDERER_BG_COLOR = 0xF4F4F4
const SHAPES = [
  { x: 280, y: 150, w: 350, h: 350, fill: 0xFF7600 }, // left-top
  { x: 1750, y: 50, w: 250, h: 250, fill: 0x05BBB7 },  // right-top
  { x: 250, y: 800, w: 250, h: 250, fill: 0xDC0451 },  // left-bottom
  { x: 1700, y: 700, w: 350, h: 350, fill: 0xFDC82F }, // right-bottom
  { x: 960, y: 400, w: 400, h: 390, fill: 0xFFFFFF }   // central
]

let renderer, stage

export default {
  components: {
    slogan
  },
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
    window.addEventListener('resize', this.handleResize)
    renderer = PIXI.autoDetectRenderer(
      RENDERER_W, RENDERER_H,
      {
        antialias: true,
        transparent: false
      }
    )
    stage = new PIXI.Container()

    for (const shape of SHAPES ) {
      const g = new PIXI.Graphics()

      g.beginFill(shape.fill)
      g.drawEllipse(shape.x, shape.y, shape.w, shape.h)
      g.endFill()

      stage.addChild(g)
    }
    
    document.getElementById("canvas").appendChild(renderer.view)
    this.handleResize()

    renderer.backgroundColor = RENDERER_BG_COLOR
    renderer.render(stage)
  }
}
</script>

<style lang="stylus">
</style>

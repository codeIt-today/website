<template>
  <div class="window">
    <div class="titlebar">
      <div class="buttons">
        <span class="close"></span>
        <span class="minimize"></span>
        <span class="zoom"></span>
      </div>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'terminal'
}
</script>

<style lang="stylus">
.window
  background: #fff
  width: 500px
  height: 300px
  margin: auto
  border: 1px solid #acacac
  border-radius: 6px
  box-shadow: 0px 0px 20px #acacac

.titlebar
  display: flex
  background: linear-gradient(to bottom, #ebebeb, #d5d5d5)
  height: 30px
  padding: 0 7px
  border-top: 1px solid #f3f1f3
  border-bottom: 1px solid #b1aeb1
  border-top-left-radius: 6px
  border-top-right-radius: 6px
  user-select: none
  cursor: default

.buttons
  display: flex
  align-items: center
  justify-content: center

.close
  background: #ff5c5c
  width: 15px
  height: 15px
  border: 1px solid #e33e41
  border-radius: 50%
  display: inline-block

.minimize
  background: #ffbd4c
  margin-left: 4px
  width: 15px
  height: 15px
  border: 1px solid #e09e3e
  border-radius: 50%
  display: inline-block

.zoom
  background: #00ca56
  margin-left: 6px
  width: 15px
  height: 15px
  border: 1px solid #14ae46
  border-radius: 50%
  display: inline-block

.content
  padding: 10px 20px
  word-wrap: break-word
  line-height: 1.2

</style>

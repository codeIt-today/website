<template>
  <div>
    <h1>codeIt.today</h1>
    <div class="window">
      <div class="titlebar">
        <div class="buttons">
          <span class="close"></span>
          <span class="minimize"></span>
          <span class="zoom"></span>
        </div>
      </div>
      <div class="content">
        <div class="slogan">
          <span id="prefix"></span>
          <span id="subject" :class="{ 'subject-underline': showSubject }"></span>
          <span id="postfix"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro')

.slogan
  font-size: 60px
  font-weight: 400
  font-family: 'Anonymous Pro', monospace

.subject-underline
  border-bottom: 3px solid #444

#subject
  padding: 0 15px
  margin 0 10px
  font-weight: 700
  color: #444

@keyframes blink
  from
    opacity: 0
  to
    opacity: 1

.is-typing::after
  content: '|'
  animation: blink 700ms infinite
  font-weight: 100
  position: absolute
  margin-left: -15px

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

<script>
import theaterJS from 'theaterjs'

export default {
  data () {
    return {
      showSubject: false
    }
  },
  mounted () {
    // Prefetch courses
    this.$store.dispatch('FETCH_COURSES')

    const theater = theaterJS({
      // the lower, the faster
      'minSpeed': {
        'erase': 80,
        'type': 100
      },
      'maxSpeed': {
        'erase': 280,
        'type': 300
      }
    })
    const subjects = [
      'React',
      'Vue',
      'Angular',
      'Everything'
    ]
    let sIndex = 0 // index of subjects array, must be zero
    let isStartLooping = false

    const addNextSubjectScene = sIndex => done => {
      if (!isStartLooping) isStartLooping = true

      sIndex = sIndex + 1 >= subjects.length ? 0 : sIndex + 1 // loop for subjects
      theater.addScene(1000, `subject:${subjects[sIndex]}`, addNextSubjectScene(sIndex))
      done()
    }

    theater
      .on('type:start, erase:start', () => {
        const actor = theater.getCurrentActor()
        actor.$element.classList.add('is-typing')
      })
      .on('type:end, erase:end', () => {
        const actor = theater.getCurrentActor()
        if (!isStartLooping) actor.$element.classList.remove('is-typing')
      })
  
    theater
      .addActor('prefix')
      .addActor('subject')
      .addActor('postfix')
    
    theater
      .addScene('prefix:Learn', 200, done => {
        this.showSubject = true
        done()
      })
      .addScene(`subject:${subjects[sIndex]}`)
      .addScene('postfix:today!', addNextSubjectScene(sIndex))
  }
}
</script>

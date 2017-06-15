<template>
  <div class="slogan">
    <span id="prefix"></span>
    <span id="subject" :class="{ 'subject-underline': showSubject }"></span>
    <span id="postfix"></span>
  </div>
</template>

<script>
import theaterJS from 'theaterjs'

export default {
  name: 'slogan',
  data () {
    return {
      showSubject: false
    }
  },
  mounted () {
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

</style>

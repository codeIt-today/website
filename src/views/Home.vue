<template>
  <div>
    <h1>codeIt.today</h1>
    <div class="slogan">
      <span id="prefix"/>
      <span id="subject" :class="{ 'subject-underline': showSubject }" />
      <span id="postfix"/>
    </div>
  </div>
</template>

<style lang="stylus">
.slogan
  font-size: 48pt
  font-weight: 300

.subject-underline
  border-bottom: 4px solid #444

#subject
  padding: 0 10px
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
  font-weight: 300

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
      'Code It',
      'Everything you need'
    ]
    let sIndex = 0 // index of subjects array, must be zero
    let isStartLooping = false

    const addNextSubjectScene = sIndex => done => {
      if (!isStartLooping) isStartLooping = true

      sIndex = sIndex + 1 >= subjects.length ? 0 : sIndex + 1 // loop for subjects
      theater.addScene(1000, 'subject: ', 300, `subject:${subjects[sIndex]}`, addNextSubjectScene(sIndex))
      done()
    }

    theater
      .on('type:start, erase:start', function () {
        var actor = theater.getCurrentActor()
        actor.$element.classList.add('is-typing')
      })
      .on('type:end, erase:end', function () {
        var actor = theater.getCurrentActor()
        if (!isStartLooping) actor.$element.classList.remove('is-typing')
      })
  
    theater
      .addActor('prefix')
      .addActor('subject')
      .addActor('postfix')
    
    theater
      .addScene('prefix:Learn ', 200, done => {
        this.showSubject = true
        done()
      })
      .addScene(`subject:${subjects[sIndex]}`)
      .addScene('postfix: today!', addNextSubjectScene(sIndex))
  }
}
</script>

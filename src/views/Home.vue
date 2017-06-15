<template>
  <div>
    <h1>codeIt.today</h1>
    <banner></banner>
    <terminal></terminal>
  </div>
</template>

<script>
import banner from '../components/Banner.vue'
import terminal from '../components/Terminal.vue'

export default {
  components: {
    banner,
    terminal
  },
  mounted () {
    // Prefetch courses
    this.$store.dispatch('FETCH_COURSES')
  }
}
</script>

<style lang="stylus">
</style>

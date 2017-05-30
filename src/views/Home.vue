<template>
  <h1>codeIt.today</h1>
</template>

<script>
export default {
  mounted () {
    // Prefetch courses
    this.$store.dispatch('FETCH_COURSES')
  }
}
</script>

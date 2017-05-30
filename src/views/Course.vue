<template>
  <div>
    <h1>Course {{ $route.params.slug }}</h1>
    <div>
      {{ $store.state.course }}
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COURSE_MENU', route.params.slug)
  }
}
</script>

<template>
  <div>
    <h1>課程</h1>
    <div>
      {{ $store.state.courses }}
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    return store.dispatch('FETCH_COURSES')
  }
}
</script>

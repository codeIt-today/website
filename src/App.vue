<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>首頁</router-link>
        <router-link to="/courses">課程</router-link>
        <router-link to="/course/vue-in-action">Test course</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
body
  background-color #eee
  color #444
  font-family -apple-system, BlinkMacSystemFont, Roboto, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
  font-size 15px
  margin 0

.fade-enter-active, .fade-leave-active
  transition all .1s ease

.fade-enter, .fade-leave-active
  opacity 0

</style>

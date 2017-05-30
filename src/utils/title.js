function getTitle (vm) {
  const viewTitle = vm.$options.title
  if (viewTitle) {
    const title = typeof viewTitle === 'function'
      ? viewTitle.call(vm)
      : viewTitle

    if (title) {
      return `${title} - codeIt.Today`
    }
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin

export default {
  SET_COURSES (state, { courses }) {
    state.courses = courses
  },

  SET_COURSE_MENU (state, { slug, menu }) {
    if (!state.course[slug]) {
      state.course[slug] = {}
    }
    state.course[slug]._menu = menu
  },
}

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888'

const fetchCourses = () =>
  axios.get(`/courses`).then(res => res.data)

const fetchCourseMenu = slug =>
  axios.get(`/course/${slug}/menu`).then(res => res.data)

export default {
  FETCH_COURSES ({ commit, state }) {
    return fetchCourses().then(data => commit('SET_COURSES', data))
  },

  FETCH_COURSE_MENU ({ commit, state }, courseSlug) {
    return fetchCourseMenu(courseSlug).then(data =>
      commit('SET_COURSE_MENU', {
        slug: courseSlug,
        menu: data.menu,
      })
    )
  },
}
